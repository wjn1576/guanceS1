import React, { useEffect, useRef } from 'react';
import { Icons } from './Icons';
import L from 'leaflet';
// @ts-ignore
import 'leaflet.markercluster';

// Helper to calculate a quadratic bezier curve between two lat/lng points
// This creates the "flight path" arch effect
function getCurvePoints(start: L.LatLngExpression, end: L.LatLngExpression, offsetFactor = 0.2): L.LatLngExpression[] {
    const lat1 = (start as any)[0];
    const lng1 = (start as any)[1];
    const lat2 = (end as any)[0];
    const lng2 = (end as any)[1];

    const offsetX = Math.abs(lng2 - lng1) * 0.1;
    const offsetY = Math.abs(lat2 - lat1) * offsetFactor * -1; // Negative to curve upwards

    // Control point (midpoint + offset)
    const rLat = (lat1 + lat2) / 2 + offsetY + 10; 
    const rLng = (lng1 + lng2) / 2 + offsetX;

    const points: L.LatLngExpression[] = [];
    for (let t = 0; t <= 1; t += 0.05) {
        const lat = (1 - t) * (1 - t) * lat1 + 2 * (1 - t) * t * rLat + t * t * lat2;
        const lng = (1 - t) * (1 - t) * lng1 + 2 * (1 - t) * t * rLng + t * t * lng2;
        points.push([lat, lng]);
    }
    return points;
}

export const GlobalNodes: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // 1. Initialize Map
    const map = L.map(mapContainerRef.current, {
      center: [25, 10], 
      zoom: 1.5,
      zoomControl: true, // Enable zoom buttons
      attributionControl: false,
      scrollWheelZoom: false, // Disable scroll zoom
      dragging: true, // Keep dragging enabled
      doubleClickZoom: false, // Disable double click zoom
      boxZoom: false, // Disable box zoom
      keyboard: false, // Disable keyboard controls
      touchZoom: false, // Disable touch zoom
    });
    mapInstanceRef.current = map;

    // 2. Add Tile Layer (CartoDB Light for clean look)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
      opacity: 0.9
    }).addTo(map);

    // 3. Define Custom Icons
    const createNodeIcon = (isMain: boolean = false) => L.divIcon({
      className: 'custom-pin',
      html: `
        <div style="position: relative; width: ${isMain ? 24 : 16}px; height: ${isMain ? 24 : 16}px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 100%; height: 100%; background-color: ${isMain ? '#3B82F6' : '#FF6A00'}; border-radius: 50%; opacity: 0.3; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: absolute; width: ${isMain ? 10 : 6}px; height: ${isMain ? 10 : 6}px; background-color: ${isMain ? '#3B82F6' : '#FF6A00'}; border-radius: 50%; opacity: 0.9; box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);"></div>
          ${isMain ? '<div style="position: relative; width: 4px; height: 4px; background-color: white; border-radius: 50%;"></div>' : ''}
        </div>
        <style>@keyframes ping { 75%, 100% { transform: scale(2.5); opacity: 0; } }</style>
      `,
      iconSize: [isMain ? 24 : 16, isMain ? 24 : 16],
      iconAnchor: [isMain ? 12 : 8, isMain ? 12 : 8],
    });

    // 4. Data Points (Hubs)
    const mainNodes = [
      { id: 'sf', name: "Silicon Valley", coords: [37.77, -122.41] },
      { id: 'va', name: "Virginia", coords: [38.90, -77.03] },
      { id: 'fra', name: "Frankfurt", coords: [50.11, 8.68] },
      { id: 'sh', name: "Shanghai", coords: [31.23, 121.47] },
      { id: 'sg', name: "Singapore", coords: [1.35, 103.81] },
      { id: 'syd', name: "Sydney", coords: [-33.86, 151.20] },
      { id: 'tok', name: "Tokyo", coords: [35.67, 139.65] }
    ];

    // Generate random sub-nodes around main nodes to demonstrate clustering
    const allNodes: any[] = [...mainNodes.map(n => ({ ...n, type: 'main' }))];
    mainNodes.forEach(node => {
        for (let i = 0; i < 8; i++) {
            const lat = node.coords[0] + (Math.random() - 0.5) * 15;
            const lng = node.coords[1] + (Math.random() - 0.5) * 15;
            allNodes.push({
                id: `${node.id}_sub_${i}`,
                name: `${node.name} Edge-${i+1}`,
                coords: [lat, lng],
                type: 'edge'
            });
        }
    });

    // 5. Create Marker Cluster Group
    // @ts-ignore - Leaflet.markercluster adds this to L
    const markers = L.markerClusterGroup({
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        spiderfyOnMaxZoom: true,
        removeOutsideVisibleBounds: true,
        // Custom cluster icon styling
        iconCreateFunction: function (cluster: any) {
            const childCount = cluster.getChildCount();
            let c = ' marker-cluster-';
            if (childCount < 10) {
                c += 'small';
            } else if (childCount < 100) {
                c += 'medium';
            } else {
                c += 'large';
            }

            // Custom HTML for the cluster icon
            return L.divIcon({ 
                html: `<div class="w-full h-full flex items-center justify-center"><span>${childCount}</span></div>`, 
                className: 'custom-cluster', 
                iconSize: new L.Point(40, 40) 
            });
        }
    });

    // Add markers to the cluster group
    allNodes.forEach(node => {
      const isMain = node.type === 'main';
      const marker = L.marker(node.coords as L.LatLngExpression, { icon: createNodeIcon(isMain) })
        .bindTooltip(node.name, { 
            permanent: false, 
            direction: 'top', 
            className: 'bg-white px-2 py-1 rounded shadow-md text-xs font-bold border border-gray-100 text-gray-700',
            offset: [0, isMain ? -12 : -8]
        });
      markers.addLayer(marker);
    });

    // Add cluster group to map
    map.addLayer(markers);

    // 6. Draw Curved Connecting Lines (Only between main nodes)
    const routes = [
        ['sh', 'sf'], ['sf', 'va'], ['va', 'fra'], ['fra', 'sh'],
        ['sh', 'sg'], ['sg', 'syd'], ['sh', 'tok'], ['tok', 'sf'],
        ['sf', 'syd'], ['fra', 'sg']
    ];

    routes.forEach(route => {
        const startNode = mainNodes.find(n => n.id === route[0]);
        const endNode = mainNodes.find(n => n.id === route[1]);
        
        if (startNode && endNode) {
            const curvePoints = getCurvePoints(
                startNode.coords as L.LatLngExpression, 
                endNode.coords as L.LatLngExpression
            );

            // Backing line for visibility
            L.polyline(curvePoints, {
                color: '#93C5FD', // Light Blue
                weight: 3,
                opacity: 0.3,
                interactive: false
            }).addTo(map);

            // Animated dash line
            L.polyline(curvePoints, {
                color: '#2563EB', // Strong Blue
                weight: 2,
                opacity: 0.8,
                className: 'flowing-line',
                interactive: false
            }).addTo(map);
        }
    });

    // 7. Add Subtle "Pulse" Coverage Circles (Background decoration)
    const zones = [
        { coords: [35, -100], radius: 3500000 },
        { coords: [35, 105], radius: 4500000 },
        { coords: [45, 10], radius: 2500000 },
    ];

    zones.forEach(zone => {
        L.circle(zone.coords as L.LatLngExpression, {
            color: 'transparent',
            fillColor: '#FF6A00',
            fillOpacity: 0.03,
            radius: zone.radius,
            interactive: false
        }).addTo(map);
    });

    // 8. Auto-pan Animation
    let panDirection = 1;
    const animatePan = () => {
        if (!mapInstanceRef.current) return;
        const currentCenter = map.getCenter();
        
        if (currentCenter.lng > 120) panDirection = -1;
        if (currentCenter.lng < -20) panDirection = 1;
        
        map.panBy([0.2 * panDirection, 0], { animate: false });
        requestAnimationFrame(animatePan);
    };
    const animationFrame = requestAnimationFrame(animatePan);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <section className="bg-white py-16 lg:py-24 border-b border-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">
          
          {/* Left Text Content - Clean, vertical layout */}
          <div className="lg:w-5/12 flex flex-col justify-center"> 
             <div className="relative">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-guance-orange rounded-full opacity-80"></div>
                <div className="pl-6">
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
                    全球节点 <br/><span className="text-guance-orange">极速送达</span>
                    </h2>
                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    无论您的业务位于何处，观测云遍布全球的安全合规节点网络都能确保数据的实时采集与秒级监控。
                    </p>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-y-8 gap-x-4 mb-8 pl-6">
                <div>
                    <div className="text-3xl lg:text-4xl font-black text-gray-900 mb-1">10+</div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">核心骨干网</div>
                </div>
                <div>
                    <div className="text-3xl lg:text-4xl font-black text-gray-900 mb-1">200+</div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">边缘接入点</div>
                </div>
                <div>
                    <div className="text-3xl lg:text-4xl font-black text-gray-900 mb-1">99.9%</div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">服务可用性</div>
                </div>
                <div>
                    <div className="text-3xl lg:text-4xl font-black text-gray-900 mb-1">ms级</div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">数据延迟</div>
                </div>
             </div>

             <div className="pl-6">
                <a href="#" className="inline-flex items-center text-white bg-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-all group shadow-lg shadow-gray-200">
                    查看完整节点分布 <Icons.ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
             </div>
          </div>

          {/* Map Container Wrapper - Side by side, taking up remaining space */}
          <div className="lg:w-7/12 h-[500px] lg:h-[600px] w-full relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
             {/* The Map */}
             <div ref={mapContainerRef} className="w-full h-full bg-[#F8FAFC]"></div>
             
             {/* Inner Shadows for depth */}
             <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.05)] z-[400]"></div>
          </div>

        </div>
      </div>
    </section>
  );
};