import Image from 'next/image'
import { memo, type ComponentPropsWithoutRef } from 'react'

type SkillLogoProps = Omit<ComponentPropsWithoutRef<typeof Image>, 'src' | 'alt'> & {
  src: string
  alt: string
}

function SkillLogoComponent({ src, alt, className, ...props }: SkillLogoProps) {
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
