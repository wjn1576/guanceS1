import React, { useEffect, useRef } from 'react';
import { Icons } from './Icons';
import L from 'leaflet';
// @ts-ignore
import 'leaflet.markercluster';

// Helper to calculate a quadratic bezier curve between two lat/lng points
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
      zoomControl: true, // Enabled zoom control
      attributionControl: false,
      scrollWheelZoom: true, // Enabled scroll zoom for better UX if they want to control it
      dragging: true,
      doubleClickZoom: true,
      boxZoom: false,
      keyboard: false,
      touchZoom: true,
    });
    mapInstanceRef.current = map;

    // 2. Add Dark Theme Tile Layer (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
      opacity: 1
    }).addTo(map);

    // 3. Define Custom Icons - Neon Style
    const createNodeIcon = (isMain: boolean = false) => L.divIcon({
      className: 'custom-pin',
      html: `
        <div style="position: relative; width: ${isMain ? 24 : 12}px; height: ${isMain ? 24 : 12}px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 100%; height: 100%; background-color: ${isMain ? '#FF6A00' : '#00F0FF'}; border-radius: 50%; opacity: 0.4; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: absolute; width: ${isMain ? 10 : 6}px; height: ${isMain ? 10 : 6}px; background-color: ${isMain ? '#FF6A00' : '#00F0FF'}; border-radius: 50%; opacity: 1; box-shadow: 0 0 10px ${isMain ? '#FF6A00' : '#00F0FF'};"></div>
        </div>
        <style>@keyframes ping { 75%, 100% { transform: scale(2.5); opacity: 0; } }</style>
      `,
      iconSize: [isMain ? 24 : 12, isMain ? 24 : 12],
      iconAnchor: [isMain ? 12 : 6, isMain ? 12 : 6],
    });

    // 4. Data Points
    const mainNodes = [
      { id: 'sf', name: "Silicon Valley", coords: [37.77, -122.41] },
      { id: 'va', name: "Virginia", coords: [38.90, -77.03] },
      { id: 'fra', name: "Frankfurt", coords: [50.11, 8.68] },
      { id: 'sh', name: "Shanghai", coords: [31.23, 121.47] },
      { id: 'sg', name: "Singapore", coords: [1.35, 103.81] },
      { id: 'syd', name: "Sydney", coords: [-33.86, 151.20] },
      { id: 'tok', name: "Tokyo", coords: [35.67, 139.65] }
    ];

    const allNodes: any[] = [...mainNodes.map(n => ({ ...n, type: 'main' }))];
    mainNodes.forEach(node => {
        for (let i = 0; i < 5; i++) {
            const lat = node.coords[0] + (Math.random() - 0.5) * 20;
            const lng = node.coords[1] + (Math.random() - 0.5) * 20;
            allNodes.push({
                id: `${node.id}_sub_${i}`,
                name: `${node.name} Edge-${i+1}`,
                coords: [lat, lng],
                type: 'edge'
            });
        }
    });

    const markers = L.markerClusterGroup({
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        spiderfyOnMaxZoom: true,
        removeOutsideVisibleBounds: true,
        iconCreateFunction: function (cluster: any) {
            const childCount = cluster.getChildCount();
            return L.divIcon({ 
                html: `<div class="w-full h-full flex items-center justify-center text-xs text-white font-mono font-bold bg-blue-600/30 border border-blue-500 rounded-full backdrop-blur-sm box-content" style="box-shadow: 0 0 10px #3B82F6"><span>${childCount}</span></div>`, 
                className: 'custom-cluster', 
                iconSize: new L.Point(40, 40) 
            });
        }
    });

    allNodes.forEach(node => {
      const isMain = node.type === 'main';
      const marker = L.marker(node.coords as L.LatLngExpression, { icon: createNodeIcon(isMain) })
        .bindTooltip(node.name, { 
            permanent: false, 
            direction: 'top', 
            className: 'bg-black/80 text-white border border-white/20 px-2 py-1 rounded text-xs font-mono',
            offset: [0, isMain ? -12 : -8]
        });
      markers.addLayer(marker);
    });

    map.addLayer(markers);

    // 6. Draw Glowing Lines
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

            // Backing line
            L.polyline(curvePoints, {
                color: '#1E40AF', 
                weight: 1,
                opacity: 0.3,
                interactive: false
            }).addTo(map);

            // Animated dash line (Cyan)
            L.polyline(curvePoints, {
                color: '#00F0FF',
                weight: 2,
                opacity: 0.8,
                className: 'flowing-line',
                interactive: false
            }).addTo(map);
        }
    });

    // 8. Auto-pan (Optional: Disable if user wants to control manually, but can keep for effect if not interacting)
    // We'll keep it but check for interaction
    let panDirection = 1;
    let isUserInteracting = false;
    
    map.on('mousedown', () => isUserInteracting = true);
    map.on('mouseup', () => isUserInteracting = false);
    map.on('dragstart', () => isUserInteracting = true);
    map.on('dragend', () => isUserInteracting = false);

    const animatePan = () => {
        if (!mapInstanceRef.current) return;
        if (!isUserInteracting) {
            const currentCenter = map.getCenter();
            if (currentCenter.lng > 120) panDirection = -1;
            if (currentCenter.lng < -20) panDirection = 1;
            map.panBy([0.1 * panDirection, 0], { animate: false });
        }
        requestAnimationFrame(animatePan);
    };
    const animationFrame = requestAnimationFrame(animatePan);

    return () => {
      cancelAnimationFrame(animationFrame);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <section className="bg-[#050A14] py-16 lg:py-24 border-b border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow from-blue-900/10 to-transparent opacity-50 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">
          
          {/* Left Text Content */}
          <div className="lg:w-5/12 flex flex-col justify-center"> 
             <div className="relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-guance-orange to-blue-600 rounded-full"></div>
                <div className="pl-6">
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-6">
                    全球节点 <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-guance-orange to-blue-400">极速互联</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    无论您的业务位于何处，观测云遍布全球的安全合规节点网络都能确保数据的实时采集与秒级监控。
                    </p>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-y-8 gap-x-4 mb-8 pl-6">
                {[
                  { val: '10+', label: '核心骨干网' },
                  { val: '200+', label: '边缘接入点' },
                  { val: '99.9%', label: '服务可用性' },
                  { val: '<10ms', label: '平均延迟' },
                ].map((stat, i) => (
                    <div key={i}>
                        <div className="text-3xl lg:text-4xl font-black text-white mb-1 font-mono tracking-tighter">{stat.val}</div>
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{stat.label}</div>
                    </div>
                ))}
             </div>

             <div className="pl-6">
                <button className="inline-flex items-center text-black bg-white hover:bg-gray-200 px-6 py-3 rounded-lg font-bold transition-all group shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    查看网络拓扑 <Icons.ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          </div>

          {/* Map Container */}
          <div className="lg:w-7/12 h-[500px] lg:h-[600px] w-full relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
             {/* The Map */}
             <div ref={mapContainerRef} className="w-full h-full bg-[#050A14]"></div>
             
             {/* Tech Overlays */}
             <div className="absolute top-4 right-4 bg-black/80 backdrop-blur border border-white/10 p-2 rounded text-xs font-mono text-guance-accent animate-pulse">
                LIVE NETWORK STATUS: ACTIVE
             </div>
             <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur border border-white/10 px-3 py-1 rounded text-[10px] font-mono text-gray-400">
                LAT: 35.67 | LNG: 139.65
             </div>
             
             {/* Vignette */}
             <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] z-[400]"></div>
          </div>

        </div>
      </div>
    </section>
  );
};