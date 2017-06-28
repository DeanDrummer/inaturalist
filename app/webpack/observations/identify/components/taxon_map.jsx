/*
  React wrapper for our taxonmap jQuery method. The jquery method takes about
  a billion potential params. Here they are:

  {
    allLayerDescription: "Every publicly visible observation created in the iNaturalist network",
    allLayerLabel: "All observations",
    clickable: false,
    controlPosition: undefined,
    disableFullscreen: false,
    elastic_params: undefined,
    enableShowAllLayer: false,
    featuredLayerDescription: undefined,
    featuredLayerLabel: "Featured observations",
    flagLetters: undefined,
    gbifLayerDescription: undefined,
    gbifLayerHover: "Records from museums and other occurrence providers distributed " +
      "by the Global Biodiversity Informatics Facility",
    gbifLayerLabel: "GBIF network"
    latitude: undefined
    longitude: undefined
    mapStyle: undefined
    mapType: undefined
    mapTypeControl: true
    maxX: undefined
    maxY: undefined
    minX: undefined
    minY: undefined
    minZoom: NaN
    observationLayers: undefined,
    observations: [
      // array of observation json objects
    ],
    overlayMenu: true
    placeLayerDescription: undefined
    placeLayerLabel: "Place boundary"
    placeLayers: undefined
    showAccuracy: true
    showAllLayer: true
    showRange: undefined,
    taxonLayers: [
      {
        gbif: {
          disabled: true
        },
        observations: {
          observation_id: 123
        },
        places: {
          disabled: true
        },
        taxon: // taxon-like object, though common_name and to_styled_s attributes are supported
      }
    ],
    taxonObservationsLayerDescription: undefined
    taxonObservationsLayerLabel: "Observations"
    taxonPlacesLayerDescription: undefined
    taxonPlacesLayerHover: "Places where this taxon has been listed"
    taxonPlacesLayerLabel: "Checklist places"
    taxonRangeLayerDescription: undefined
    taxonRangeLayerLabel: "Range"
    urlCoords: undefined
    zoomControl: true
    zoomLevel: 8
  }
*/
import React, { PropTypes } from "react";
import ReactDOM from "react-dom";
import { objectToComparable } from "../../../shared/util";

class TaxonMap extends React.Component {
  componentDidMount( ) {
    this.setMapFromProps( );
  }
  componentDidUpdate( prevProps ) {
    if ( this.props.static ) {
      // no need to re-render a static map
      return;
    }
    if (
      objectToComparable( this.props.reloadKey || this.props )
      ===
      objectToComparable( prevProps.reloadKey || prevProps )
    ) {
      // props didn't change, don't re-render
      return;
    }
    this.setMapFromProps( );
    google.maps.event.trigger( $( ReactDOM.findDOMNode( this ) ).data( "taxonMap" ), "resize" );
  }
  setMapFromProps( ) {
    $( ReactDOM.findDOMNode( this ) ).taxonMap( this.props );
  }
  render( ) {
    return (
      <div className={`TaxonMap ${this.props.className}`} style={ { minHeight: "10px" } } />
    );
  }
}

TaxonMap.propTypes = {
  className: PropTypes.string,
  reloadKey: PropTypes.string,
  static: PropTypes.bool,
  observations: PropTypes.array
};

export default TaxonMap;
