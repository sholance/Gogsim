import React, { useRef, useEffect } from 'react';
import { Map, View, Feature } from 'ol/index.js';
import { Tile as TileLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { fromLonLat, transform } from 'ol/proj';
import { useGeographic } from 'ol/proj.js';
import { Point } from 'ol/geom.js';
import VectorLayer from 'ol/layer/Vector';
import { Style, Circle, Fill } from 'ol/style';


interface GulfOfGuineaMapProps { }


const GulfMap: React.FC<GulfOfGuineaMapProps> = () => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    useGeographic();


    useEffect(() => {
        if (mapRef.current) {
            const view = new View({
                center: fromLonLat([-3.78, 5]),
                zoom: 30
            });


            const vectorSource = new VectorSource({
                features: [
                    new Feature({
                        geometry: new Point(transform([-3.78, 5], 'EPSG:4326', 'EPSG:3857')),
                        name: 'Marine Litter'
                    })
                ]
            });

            const map = new Map({
                target: mapRef.current,
                layers: [
                    new TileLayer({
                        source: new OSM()
                    }),
                    new VectorLayer({
                        source: vectorSource,
                        style: new Style({
                            image: new Circle({
                                radius: 5,
                                fill: new Fill({
                                    color: 'red'
                                })
                            })
                        })
                    })
                ],
                view: view
            });
        }
    }, []);

    return <div ref={mapRef} style={{ width: '100%', height: '70vw' }} />;
}

export default GulfMap;