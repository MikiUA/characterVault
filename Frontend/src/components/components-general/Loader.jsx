import { EmptyOverlay } from './Overlay'
import Spinner from './Spinner'

export default function Loader() {
  return (
    <EmptyOverlay>
        <Spinner/>
    </EmptyOverlay>
  )
}
