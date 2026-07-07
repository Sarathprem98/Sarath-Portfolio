import { githubStats as fallbackStats } from '@/lib/data'

type GitHubUser = {
  login: string
  name: string | null
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
  following: number
  bio: string | null
}

type GitHubRepo = {
  language: string | null
  stargazers_count: number
}

export type GitHubProfile = {
  user: GitHubUser | null
  topLanguages: { name: string; percent: number }[]
  stats: {
    contributions: string
    repositories: string
    stars: string
    prs: string
    followers: string
  }
}

function formatCompact(value: number) {
  return new Intl.NumberFormat('en', { notation: 'compact' }).format(value)
}

export async function getGitHubProfile(username: string): Promise<GitHubProfile> {
  try {
    const [userResponse, repoResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: { Accept: 'application/vnd.github+json' },
        next: { revalidate: 60 * 60 },
      }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
        headers: { Accept: 'application/vnd.github+json' },
        next: { revalidate: 60 * 60 },
      }),
    ])

    if (!userResponse.ok || !repoResponse.ok) {
      throw new Error('GitHub API request failed')
    }

    const user = (await userResponse.json()) as GitHubUser
    const repos = ((await repoResponse.json()) as GitHubRepo[]).filter(
      (repo) => repo.language,
    )

    const stars = repos.reduce((total, repo) => total + repo.stargazers_count, 0)
    const counts = repos.reduce<Record<string, number>>((acc, repo) => {
      const language = repo.language ?? 'Other'
      acc[language] = (acc[language] ?? 0) + 1
      return acc
    }, {})

    const totalRepos = repos.length || user.public_repos || 1
    const topLanguages = Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4)
      .map((item) => ({
        name: item.name,
        percent: Math.max(8, Math.round((item.count / totalRepos) * 100)),
      }))

    return {
      user,
      topLanguages: topLanguages.length ? topLanguages : fallbackStats.languages,
      stats: {
        contributions: fallbackStats.stats[0].value,
        repositories: formatCompact(user.public_repos),
        stars: formatCompact(stars),
        prs: fallbackStats.stats[3].value,
        followers: formatCompact(user.followers),
      },
    }
  } catch {
    return {
      user: null,
      topLanguages: fallbackStats.languages,
      stats: {
        contributions: fallbackStats.stats[0].value,
        repositories: fallbackStats.stats[1].value,
        stars: fallbackStats.stats[2].value,
        prs: fallbackStats.stats[3].value,
        followers: '—',
      },
    }
  }
}