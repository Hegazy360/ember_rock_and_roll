import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  songCreationStarted: false,
  noSongs: computed('model.songs.[]', function() {
    return this.get('model.songs.length') === 0;
  }),
  actions: {
    enableSongCreation: function() {
      this.set('songCreationStarted', true);
    },
    updateRating: function(params) {
      var song = params.item,
          rating = params.rating;

      song.set('rating', rating);
    },
  },
  canCreateSong: computed('songCreationStarted', 'model.songs.[]', function() {
    console.log('computing');
    return this.get('songCreationStarted') || this.get('model.songs.length');
  })
});
