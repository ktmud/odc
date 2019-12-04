import React, { createRef, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import DEFAULT_STYLE from './baidumap-style.json';
import MobileDetect from 'mobile-detect';

const md = new MobileDetect(window.navigator.userAgent);

export default ({
  center,
  zoom = 16,
  width,
  height = '55vh',
  styleJson = DEFAULT_STYLE,
  mapOptions = {
    enableDragging: false,
    enableHighResolution: true,
    enableAutoResize: true,
    enableMapClick: false,
    enableDblclickZoom: false,
  },
  markers,
}) => {
  const ref = createRef();
  const {
    site: {
      siteMetadata: { baiduMapAPIKey },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            baiduMapAPIKey
          }
        }
      }
    `,
  );

  useEffect(() => {
    let unmounted = false;

    const init = () => {
      if (unmounted) return;
      if (!ref.current) return;

      const map = new BMap.Map(ref.current, mapOptions);
      if (mapOptions.enableDragging === false) {
        map.disableDragging();
      }
      if (mapOptions.enableDblclickZoom === false) {
        map.disableDoubleClickZoom();
      }
      const loc = center ? new BMap.Point(center.lng, center.lat) : null;
      if (loc && zoom) {
        map.centerAndZoom(loc, zoom);
      } else {
        if (loc) {
          map.setCenter(loc);
        }
        if (zoom) {
          map.setZoom(zoom);
        }
      }
      if (styleJson) {
        map.setMapStyleV2({ styleJson });
      }
      if (markers) {
        markers.forEach((x) => {
          let icon = undefined;
          if (x.icon) {
            icon = new BMap.Icon(x.icon, new BMap.Size(43, 48), {
              anchor: new BMap.Size(20, 48),
            });
          }
          const point = new BMap.Point(x.lng, x.lat);
          const marker = new BMap.Marker(point, { icon });
          if (x.invokeURI) {
            let uris = [];
            if (md.os() === 'iOS' || md.os() === 'iPadOS') {
              uris.push(
                `baidumap://map/place/detail?uid=${x.placeId}&src=ios.odc.web`,
              );
            } else if (md.os() === 'Android') {
              uris.push(
                `baidumap://map/place/detail?uid=${x.placeId}&src=android.odc.web`,
              );
            }
            uris.push(
              `http://api.map.baidu.com/place/detail?uid=${x.placeId}&output=html&src=desktop.odc.web&zoom=16`,
            );
            marker.addEventListener('click', () => {
              for (let uri of uris) {
                try {
                  window.open(uri);
                  break;
                } catch (err) {
                  console.log(err);
                }
              }
            });
          }
          // if (x.title) {
          //   const opts = {
          //     width: x.width,
          //     height: x.height,
          //     title: x.title,
          //   };
          //   const infoWindow = new BMap.InfoWindow(x.content, opts);
          //   marker.addEventListener('click', () => {
          //     // if (infoWindow.isOpen()) {
          //     //   marker.closeInfoWindow();
          //     // } else {
          //     marker.openInfoWindow(infoWindow);
          //     // }
          //   });
          // }
          map.addOverlay(marker);
        });
      }
    };

    if (window.BMap) {
      init();
    } else {
      const script = document.createElement('script');
      const initfunc = 'baidumapinit';
      window[initfunc] = () => {
        init();
        delete window[initfunc];
      };
      script.src = `http://api.map.baidu.com/api?&v=3.0&ak=${baiduMapAPIKey}&callback=${initfunc}`;
      document.body.appendChild(script);
    }

    return () => {
      unmounted = true;
    };
  });

  return <div ref={ref} className="baidu-map" style={{ width, height }}></div>;
};
