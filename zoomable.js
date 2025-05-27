/*
STYLE
    body{
        height: 100vh;
        width: 100vw;
        overflow: hidden;
    }
    div, body{
        margin:0;
        padding:0;
    }
    p{
        margin:0;
        padding:0;
    }
    body{
        width: 100vw;
        display: flex;
        flex-direction: row;
        height: 100vh;
    }
    
    #left{
        margin-top:100px;
        width: 100vw;
        height: 100vh;
        background-color: lightgray;
        overflow-x: scroll;
        overflow-y: scroll;
        position: relative;
        
        display: flex;
        justify-content: center;
    }
    #zoomBtns{
        position: fixed;
        right: 35.8vw;
        bottom: 0.8vh;
    }
    #zoomBtns button{
        width: 26px;
        height: 26px;
    }
    .zoomable{
        position: relative;
        transform-origin: 0 0;
    }
    #map{
        height: 50.227vw;
        background-color: white;
        
        background-image: url('https://media.discordapp.net/attachments/1293426709596733560/1368597915559530557/4AA2_SiteDevelopmentPlan_ENGGW-03_3.png?ex=6818cda2&is=68177c22&hm=8035b33176383dc887b9573076bd7f2797d05b7891a1845cdefb472da1024fbf&=&format=webp&quality=lossless&width=1437&height=1016');
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .mapComponent{
        overflow: hidden;
        opacity: 0%;
        background-color: white;
        position: absolute;
    }
*/

// Constants
const CONTAINER_WIDTH_VW = 65; // Container width in vw
const INITIAL_WIDTH_VW = 90; // Initial width in vw
const ASPECT_RATIO = 8.5 / 11; // Width to height ratio

// DOM Elements
const containerElement = document.getElementById('left'); // User-defined container
const zoomableElement = document.getElementById('map'); // User-defined zoomable element

// Zooming configuration
const ZOOM_INTERVAL = 0.1; // Zoom interval
let currentScale = 1; // Initial scale

// Buttons
const resetZoomBtn = document.getElementById('zoomReset');
const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');

// Event Listeners for Zoom Buttons
resetZoomBtn.addEventListener('click', function() {
    setZoom(1); // Reset zoom
});

zoomInBtn.addEventListener('click', function() {
    setZoom(currentScale + ZOOM_INTERVAL); // Zoom in
});

zoomOutBtn.addEventListener('click', function() {
    setZoom(currentScale - ZOOM_INTERVAL); // Zoom out
});

// Function to set the size of the zoomable element
function setZoomableSize(w) {
    zoomableElement.style.width = w + "vw";
    zoomableElement.style.height = w * ASPECT_RATIO + "vw";
}

// Initialize the zoomable element size on load
setZoomableSize(INITIAL_WIDTH_VW);

// Function to handle zooming
function setZoom(s) {
    currentScale = Math.max(s, 1); // Ensure scale does not go below 1
    zoomableElement.style.transform = "scale(" + currentScale + ")";
    // You can call scrollToComponent(clicked) here if needed
}

// Function to set scroll position to a specific component
function scrollToComponent(comp) {
    const centerX = (comp.left) + (comp.width) / 2;
    const centerY = (comp.top) + (comp.height) / 2;
    scrollToPosition(centerX, centerY);
}

// Function to set scroll position to specific coordinates
function scrollToPosition(l, t) {
    const viewportToMapRatio = window.innerWidth / 100 * INITIAL_WIDTH_VW;
    const scrollX = viewportToMapRatio * (currentScale / 100) * l - (viewportToMapRatio / 2);
    const scrollY = viewportToMapRatio * (currentScale / 100) * (ASPECT_RATIO * t) - (window.innerHeight / 2);
    containerElement.scrollTo(scrollX, scrollY); // Scroll to position in pixels
}
