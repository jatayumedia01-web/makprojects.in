import { FadeIn } from './Motion'
import {
  SectionAccent,
  SectionBackdrop,
  SectionHead,
} from './project/ProjectChrome'
import {
  ClubGalleryLightbox,
  useClubLightbox,
  type ClubGalleryItem,
} from './project/ClubGalleryParts'
import SerenityBrochureTile from './SerenityBrochureTile'
import { serenityMedia } from '../data/serenityPage'

/** Bento gallery — brochure renders with proper contain fit */
export default function SerenityGallery() {
  const items: ClubGalleryItem[] = serenityMedia.gallery.map((g) => ({
    id: g.id,
    title: g.title,
    caption: g.caption,
    image: g.image,
  }))

  const { lightbox, open, close, step } = useClubLightbox(items)

  const [hero, aerial, sitePlan] = items

  return (
    <>
      <section
        id="serenity-gallery"
        className="relative scroll-mt-36 overflow-hidden py-14 md:py-20"
      >
        <SectionBackdrop theme="white" fadeBottom="pearl" />
        <SectionAccent variant="fade" />
        <div className="relative site-container px-5">
          <FadeIn>
            <SectionHead eyebrow="Visuals" title="Project Gallery" />
            <p className="-mt-6 mx-auto mb-10 max-w-xl text-center text-sm leading-relaxed text-stone md:mb-12">
              Elevations, aerial views and master layout from the official BTR
              Serenity brochure.
            </p>
          </FadeIn>

          <div className="grid gap-4 md:grid-cols-12 md:gap-5">
            {hero ? (
              <FadeIn className="min-h-[300px] md:col-span-7 md:min-h-[440px]">
                <SerenityBrochureTile
                  item={hero}
                  className="min-h-[300px] md:min-h-full"
                  onOpen={() => open(hero, 0)}
                />
              </FadeIn>
            ) : null}

            <div className="grid gap-4 md:col-span-5 md:grid-rows-2 md:gap-5">
              {aerial ? (
                <FadeIn delay={0.05} className="min-h-[200px] md:min-h-0">
                  <SerenityBrochureTile
                    item={aerial}
                    className="min-h-[200px] md:h-full md:min-h-[210px]"
                    onOpen={() => open(aerial, 1)}
                  />
                </FadeIn>
              ) : null}

              {sitePlan ? (
                <FadeIn delay={0.08} className="min-h-[200px] md:min-h-0">
                  <SerenityBrochureTile
                    item={sitePlan}
                    className="min-h-[200px] md:h-full md:min-h-[210px]"
                    onOpen={() => open(sitePlan, 2)}
                  />
                </FadeIn>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <ClubGalleryLightbox
        items={items}
        lightbox={lightbox}
        onClose={close}
        onStep={step}
      />
    </>
  )
}
