import { connect } from "react-redux";
import _ from "lodash";
import * as d3 from "d3";
import TaxonMap from "../../../observations/identify/components/taxon_map";

function mapStateToProps( state ) {
  const colorScale = d3.scaleOrdinal( d3.schemeCategory10 );
  const observationLayers = _.map( state.compare.queries, query => {
    const layer = $.deparam( query.params );
    layer.color = colorScale( query.params );
    layer.title = `<div style="width: 15px; height: 15px; display: inline-block; vertical-align: middle; margin-right: 5px; background-color: ${layer.color};"></div>${query.name}`;
    return layer;
  } );

  return {
    showAllLayer: false,
    observationLayers
  };
}

function mapDispatchToProps( ) {
  return {};
}

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)( TaxonMap );

export default MapContainer;
