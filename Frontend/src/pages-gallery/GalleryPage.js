import { apigetGallery } from 'functions-api/apiGallleryFunctions'
import GalleryLogic from 'components/components-gallery/GalleryLogic'

export default function GalleryPage() {
	function updateGallery(filter){
		return apigetGallery(filter);
	}
  return (
	<GalleryLogic updateItemsFunction={updateGallery}/>
  )
}