import React, { PropTypes, Component } from 'react';
import History from './history.jsx';
import SearchResults from './search-results.jsx';
import Artists from './artists.jsx';
import ArtistEvents from './artist-events.jsx';
import Search from './search.jsx';
import Map from './map.jsx';
import { querySongKickArtists, querySongKickArtistEvent } from '../../providers/songkick.js';
import { get } from '../../utils/xhr.js'

class TourTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: [],
      artistEvents: [],
      history: [],
      lat: null,
      lng: null,
      query: '',
    };
  }

  onChangeQuery(query) {
    return this.setState({ query });
  }

  onSearchArtists() {
    if(this.state.query) {
      const query = querySongKickArtists(this.state.query);

      return get(query).then((res) => {
        const artists = res.resultsPage.results.artist;
        this.setState({ artists }); 
      });    
    }
  }

  onSearchArtistEvents(id) {
    const artistEvents = querySongKickArtistEvent(id);
    return get(artistEvents).then((res) => {
      const artistEvents = res.resultsPage.results.event;
      this.setState({ artistEvents });
    });
  }

  onGetVenueMap({ lat, lng }) {
    console.log('lat', lat, 'lng', lng);
    this.setState({ lat, lng });
  }

  onClearHistory() {
    this.setState({ history: [] });
  }

  onClearSearchResults() {
    this.setState({ artistEvents: [] });
  }

  onClearQueryResults() {
    this.setState({ artists: [] });
  }

  renderMap() {
    if ( this.state.lat && this.state.lng ){
      return (
        <Map 
          lat={ this.state.lat }
          lng={ this.state.lng }
        />
      );
    } else {
      return false;
    }
  }

  render() {
    return (
      <section className="tour-tracker">
        <div className="container-fluid">
          <div className="row">
            <div className="sidebar col-sm-3 col-lg-2">
              <Search 
                onSearch
                onChange={ this.onChangeQuery.bind(this) }
                onSearch={ this.onSearchArtists.bind(this) }
                query={ this.state.query }
              />

              <Artists
                artists={ this.state.artists }
                onClick={ this.onSearchArtistEvents.bind(this) }
              />
            </div>
          </div>

          <aside>
            { this.renderMap() }
            <ArtistEvents 
              artistEvents={ this.state.artistEvents }
              onClick={ this.onGetVenueMap.bind(this) }
            />
          </aside>
        </div>
      </section>
    );
  }
}

export default TourTracker;