import SharedPageHeader from '@/components/shared/PageHeader'

// Figma's Contact header now matches the shared label+icon pattern used on
// About/Works/Resume exactly (including its 48px/56px desktop title sizing)
// — reuses that component directly instead of a bespoke one-off.
const PageHeader = () => (
  <SharedPageHeader
    label="CONTACT"
    titleBefore=""
    titleMuted="let's make "
    titleAfter="wonders"
  />
)

export default PageHeader
