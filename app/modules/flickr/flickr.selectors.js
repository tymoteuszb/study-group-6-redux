import { createSelector } from 'reselect';

const selectFlickrDomain = state => state.get('flickr');


export const selectFlickrPhotos = (count) => createSelector(
  selectFlickrDomain, state => {
    const photos = state.getIn(['photos', 'photo']);

    if (!photos) {
      return null;
    }

    return photos
      .sortBy(Math.random)
      .slice(0, count)
      .map((photo) => {
        const domain = `https://farm${photo.get('farm')}.staticflickr.com`;
        const path = `/${photo.get('server')}/${photo.get('id')}_${photo.get('secret')}_z.jpg`;
        return photo.set('url', `${domain}${path}`);
      });
  }
);
