// app/routes/bands/band/songs.js
import Route from '@ember/routing/route';
import Song from 'rarwe/models/song';

export default Route.extend({
  model: function() {
    return this.modelFor('bands.band');
  },
  resetController: function(controller) {
    controller.set('songCreationStarted', false);
  },
  actions: {
    didTransition: function() {
      var band = this.modelFor('bands.band');
      document.title = `${band.get('name')} songs - Rock & Roll`;
    },
    createSong: function() {
      var controller = this.get('controller');
      var band = this.modelFor('bands.band');
      var song = this.store.createRecord('song', {
        title: controller.get('title'),
        band: band
      });
      song.save().then(function() {
        controller.set('title', '');
      });
    },
    updateRating: function(params) {
      var song = params.item,
        rating = params.rating;
      if (song.get('rating') === rating) {
        rating = 0;
      }
      song.set('rating', rating);
      return song.save();
    }
  }
});
