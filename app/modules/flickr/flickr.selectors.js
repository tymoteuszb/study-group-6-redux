import { createSelector } from 'reselect';
import { List } from 'immutable';

const selectFlickrDomain = state => state.get('flickr');


export const selectFlickrPhotos = (count) => createSelector(
  selectFlickrDomain, state => state.getIn(['photos', 'photo'], List())
    .sortBy(Math.random)
    .slice(0, count)
    .map((photo) => {
      const domain = `https://farm${photo.get('farm')}.staticflickr.com`;
      const path = `/${photo.get('server')}/${photo.get('id')}_${photo.get('secret')}_z.jpg`;
      return photo.set('url', `${domain}${path}`);
    })
);
