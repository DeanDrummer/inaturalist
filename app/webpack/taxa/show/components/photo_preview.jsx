import React, { PropTypes } from "react";
import CoverImage from "../../../shared/components/cover_image";
import { urlForTaxonPhotos } from "../../shared/util";
import TaxonPhoto from "../../shared/components/taxon_photo";

class PhotoPreview extends React.Component {
  constructor( ) {
    super( );
    this.state = {
      taxonPhotos: []
    };
  }

  componentWillReceiveProps( newProps ) {
    let taxonPhotos;
    if ( newProps.layout === "gallery" ) {
      taxonPhotos = newProps.taxonPhotos.slice( 0, 5 );
    } else {
      taxonPhotos = newProps.taxonPhotos.slice( 0, 8 );
    }
    this.state = {
      current: newProps.taxonPhotos[0],
      taxonPhotos
    };
  }

  showPhoto( photoId ) {
    const newTaxonPhoto = this.state.taxonPhotos.find( p => p.photo.id === photoId );
    if ( newTaxonPhoto ) {
      this.setState( {
        current: newTaxonPhoto
      } );
    }
  }

  render( ) {
    const layout = this.props.layout;
    const height = layout === "gallery" ? 98 : 196.5;
    let currentPhoto;
    const showTaxonPhotoModal = this.props.showTaxonPhotoModal;
    if ( this.state.taxonPhotos.length === 0 ) {
      return (
        <div className="PhotoPreview no-content text-center text-muted">
          <div>
            <h3>
              { I18n.t( "this_taxon_has_no_default_photo" ) }
            </h3>
            <a
              href={`/taxa/${this.props.taxon.id}/edit_photos`}
              className="btn btn-primary"
              onClick={ e => {
                e.preventDefault( );
                alert( "TODO" );
                return false;
              } }
            >
              { I18n.t( "add_one_now" ) }
            </a>
          </div>
        </div>
      );
    }
    if ( this.state.current && layout === "gallery" ) {
      currentPhoto = (
        <CoverImage
          src={this.state.current.photo.photoUrl( "large" )}
          low={this.state.current.photo.photoUrl( "small" )}
          height={590}
        />
      );
    }
    const taxonPhotos = this.state.taxonPhotos;
    if ( taxonPhotos.length === 1 ) {
      taxonPhotos.pop( );
    }
    return (
      <div className={`PhotoPreview ${layout}`}>
        { currentPhoto }
        <ul className="plain others">
          { this.state.taxonPhotos.map( tp => {
            let content;
            if ( layout === "grid" ) {
              content = <TaxonPhoto
                photo={tp.photo}
                photoHeight={height}
                taxon={tp.taxon}
                showTaxonPhotoModal={showTaxonPhotoModal}
                className="photoItem"
              />;
            } else {
              content = (
                <a
                  className="photoItem"
                  href=""
                  onClick={ e => {
                    e.preventDefault( );
                    this.showPhoto( tp.photo.id );
                    return false;
                  } }
                >
                  <CoverImage
                    src={ tp.photo.photoUrl( "small" ) }
                    low={ tp.photo.photoUrl( "small" ) }
                    height={height}
                  />
                </a>
              );
            }
            return (
              <li key={ `taxon-photo-${tp.taxon.id}-${tp.photo.id}` }>
                { content }
              </li>
            );
          } ) }
          <li className="viewmore">
            <a href={urlForTaxonPhotos( this.props.taxon )}
              style={{ height: layout === "grid" ? `${height}px` : "inherit" }}
            >
              <span className="inner">
                <span>{ I18n.t( "view_more" )}</span>
                <i className="fa fa-arrow-circle-right"></i>
              </span>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

PhotoPreview.propTypes = {
  taxon: PropTypes.object,
  taxonPhotos: PropTypes.array,
  layout: PropTypes.string,
  showTaxonPhotoModal: PropTypes.func
};

PhotoPreview.defaultProps = { layout: "gallery" };

export default PhotoPreview;
