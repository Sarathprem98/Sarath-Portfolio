import Image from 'next/image'
import { memo, type ComponentPropsWithoutRef, useMemo } from 'react'

type SkillLogoProps = Omit<ComponentPropsWithoutRef<typeof Image>, 'src' | 'alt'> & {
  svg: string
  alt: string
}

function SkillLogoComponent({ svg, alt, className, ...props }: SkillLogoProps) {
  const src = useMemo(
    () => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
    [svg],
  )

  return (
    <Image
      src={src}
      alt={alt}
      width={32}
      height={32}
      sizes="32px"
      decoding="async"
      loading="lazy"
      unoptimized
      className={className}
      {...props}
    />
  )
}

export const SkillLogo = memo(SkillLogoComponent)
