import React, { useRef, useEffect } from 'react';
import { Map, View } from 'ol/index.js';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import { fromLonLat } from 'ol/proj';



interface GulfOfGuineaMapProps { }

const GulfMap: React.FC<GulfOfGuineaMapProps> = () => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const map = useRef<Map>();


    useEffect(() => {
        if (mapRef.current && !map.current) {
            const view = new View({
                center: fromLonLat([-3.78, 5]),
                zoom: 5.5
            });
            map.current = new Map({
                target: mapRef.current,
                layers: [
                    new TileLayer({
                        source: new OSM()
                    })
                ],
                view: view
            });
        }
    }, []);

    return <div ref={mapRef} style={{ width: '100%', height: '37vw', padding: '20px' }} />;
}

export default GulfMap;