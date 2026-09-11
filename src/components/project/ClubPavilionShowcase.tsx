import {
  FadeIn,
  ScrollLine,
  StaggerReveal,
} from '../Motion'
import { SectionAccent, SectionBackdrop } from './ProjectChrome'
import { btrClubPavilion } from '../../data/content'
import {
  ClubGalleryLightbox,
  ClubPhotoTile,
  useClubLightbox,
} from './ClubGalleryParts'

/** Club Pavilion - aligned bento gallery */
export default function ClubPavilionShowcase({
  id = 'township-pavilion',
}: {
  id?: string
}) {
  const images = btrClubPavilion.images
  const featured = images.find((img) => 'featured' in img && img.featured)
  const rest = images.filter((img) => !('featured' in img && img.featured))
  const { lightbox, open, close, step } = useClubLightbox(images)

  return (
    <>
      <section
        id={id}
        className="relative scroll-mt-36 overflow-hidden py-16 md:py-24"
      >
        <SectionBackdrop theme="sand" fadeBottom="pearl" />
        <SectionAccent variant="gold" />

        <div className="relative site-container px-5">
          <FadeIn>
            <div className="mb-10 text-center md:mb-12">
              <FadeIn delay={0.05}>
                <p className="text-[11px] font-semibold tracking-[0.32em] text-sage uppercase">
                  {btrClubPavilion.eyebrow}
                </p>
              </FadeIn>
              <FadeIn delay={0.12} distance={36}>
                <h2 className="mt-3 text-[clamp(1.55rem,3.2vw,2.55rem)] font-bold tracking-[0.06em] text-ink uppercase">
                  {btrClubPavilion.title}
                </h2>
              </FadeIn>
              <FadeIn delay={0.18}>
                <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[#4a5560]">
                  {btrClubPavilion.subtitle}
                </p>
              </FadeIn>
              <FadeIn delay={0.24}>
                <p className="mx-auto mt-4 max-w-3xl text-[14px] leading-relaxed text-[#5a6570]">
                  {btrClubPavilion.body}
                </p>
              </FadeIn>
              <ScrollLine className="mt-5" />
            </div>
          </FadeIn>

          <StaggerReveal
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:h-[560px] lg:grid-cols-12 lg:grid-rows-2 lg:gap-5"
            stagger={0.12}
          >
            {featured ? (
              <div className="h-[320px] sm:col-span-2 lg:col-span-7 lg:row-span-2 lg:h-full">
                <ClubPhotoTile
                  item={featured}
                  index={0}
                  theme="light"
                  className="h-full"
                  onOpen={open}
                />
              </div>
            ) : null}

            {rest.map((item, i) => (
              <div
                key={item.id}
                className="h-[240px] lg:col-span-5 lg:h-full"
              >
                <ClubPhotoTile
                  item={item}
                  index={i + 1}
                  theme="light"
                  className="h-full"
                  onOpen={open}
                />
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <ClubGalleryLightbox
        items={images}
        lightbox={lightbox}
        onClose={close}
        onStep={step}
      />
    </>
  )
}
