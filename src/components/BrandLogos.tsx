const MAK_LOGO = '/media/shared/logo/mak-projects.jpg'
const BTR_LOGO = '/media/shared/logo/btr.png'

/** Official MAK Projects logo */
export function MakLogo({
  className = 'h-12',
  alt = 'MAK Projects',
}: {
  className?: string
  alt?: string
}) {
  return (
    <img
      src={MAK_LOGO}
      alt={alt}
      className={`w-auto object-contain object-left ${className}`}
      draggable={false}
    />
  )
}

/** Official BTR — Life is Beautiful logo */
export function BtrLogo({
  className = 'h-10',
  alt = 'BTR — Life is Beautiful',
}: {
  className?: string
  alt?: string
}) {
  return (
    <img
      src={BTR_LOGO}
      alt={alt}
      className={`w-auto object-contain object-left ${className}`}
      draggable={false}
    />
  )
}

/** Per-brand logo image for carousels & showcases */
export function BrandLogoImage({
  src,
  alt,
  className = 'h-16 w-auto object-contain',
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      draggable={false}
      loading="lazy"
    />
  )
}
