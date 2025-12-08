// Hellman & Partners Geo Insight Map - Premium geografisk marknadsanalys
// Alla data är illustrativa och baseras inte på verkliga beräkningar eller formler

let mapData = [];
let hoveredChip = -1;
let selectedChip = -1;
let animationTime = 0;
let tooltip = null;

// Fiktiv data för svenska städer - INTE baserat på verkliga marknadsdata
const cities = [
    { 
        name: "Stockholm", 
        x: 680, 
        y: 210, 
        price: 62300, 
        change: 0.8, 
        trend: [48, 51, 49, 52, 54, 53, 55, 57, 56, 58],
        metrics: { omsattning: "+12%", utbud: "-8%", riskindex: "Låg" }
    },
    { 
        name: "Göteborg", 
        x: 540, 
        y: 300, 
        price: 47200, 
        change: -0.3, 
        trend: [50, 49, 48, 47, 49, 48, 47, 46, 47, 46],
        metrics: { omsattning: "+5%", utbud: "+2%", riskindex: "Medel" }
    },
    { 
        name: "Malmö", 
        x: 600, 
        y: 360, 
        price: 43800, 
        change: 0.2, 
        trend: [45, 46, 47, 46, 47, 48, 49, 49, 50, 50],
        metrics: { omsattning: "+8%", utbud: "-3%", riskindex: "Låg" }
    },
    { 
        name: "Uppsala", 
        x: 660, 
        y: 240, 
        price: 51200, 
        change: 0.1, 
        trend: [50, 50, 51, 51, 51, 52, 52, 52, 53, 53],
        metrics: { omsattning: "+3%", utbud: "+1%", riskindex: "Låg" }
    },
    { 
        name: "Umeå", 
        x: 720, 
        y: 120, 
        price: 35900, 
        change: -0.6, 
        trend: [52, 51, 50, 49, 49, 48, 47, 47, 46, 46],
        metrics: { omsattning: "-2%", utbud: "+5%", riskindex: "Hög" }
    },
    { 
        name: "Lund", 
        x: 590, 
        y: 370, 
        price: 45200, 
        change: 0.3, 
        trend: [44, 45, 46, 47, 47, 48, 49, 49, 50, 51],
        metrics: { omsattning: "+6%", utbud: "-1%", riskindex: "Medel" }
    }
];

// Premium färgpalett
const colors = {
    background: [245, 247, 250], // #F5F7FA
    primary: [11, 18, 32], // #0B1220
    secondary: [107, 114, 128], // #6B7280
    positive: [16, 185, 129], // #10B981
    negative: [239, 68, 68], // #EF4444
    neutral: [100, 116, 139], // #64748B
    mapStroke: [15, 23, 42, 0.15],
    chipBg: [255, 255, 255],
    chipShadow: [15, 23, 42, 0.08]
};

// Kontrollera användarens motion preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setup() {
    // Skapa premium canvas
    const canvas = createCanvas(1000, 600);
    canvas.parent('map-canvas');
    
    // Hämta tooltip element
    tooltip = select('#tooltip');
    
    // Generera initial data
    generateMapData();
}

function draw() {
    // Premium bakgrund
    background(colors.background);
    
    // Rita Sverige-karta (förenklad outline)
    drawSwedenMap();
    
    // Rita geo chips med animationer
    drawGeoChips();
    
    // Uppdatera animation timer
    animationTime += 0.02;
}

function generateMapData() {
    // Generera fiktiv data för alla städer
    mapData = cities.map((city, index) => ({
        ...city,
        id: index,
        hovered: false,
        selected: false,
        animationDelay: index * 0.1, // Staggered entrance
        pulsePhase: random(TWO_PI) // Random pulse timing
    }));
}

function drawSwedenMap() {
    // Rita förenklad Sverige-karta med SVG-liknande paths
    stroke(colors.mapStroke);
    strokeWeight(1);
    fill(colors.background);
    
    // Huvudland (förenklad form)
    beginShape();
    vertex(400, 100);
    vertex(500, 80);
    vertex(600, 90);
    vertex(700, 110);
    vertex(800, 120);
    vertex(850, 150);
    vertex(880, 200);
    vertex(900, 250);
    vertex(890, 300);
    vertex(870, 350);
    vertex(840, 400);
    vertex(800, 450);
    vertex(750, 480);
    vertex(700, 500);
    vertex(650, 510);
    vertex(600, 520);
    vertex(550, 530);
    vertex(500, 540);
    vertex(450, 550);
    vertex(400, 560);
    vertex(350, 550);
    vertex(300, 540);
    vertex(250, 520);
    vertex(200, 500);
    vertex(150, 480);
    vertex(120, 450);
    vertex(100, 400);
    vertex(90, 350);
    vertex(100, 300);
    vertex(120, 250);
    vertex(150, 200);
    vertex(180, 150);
    vertex(220, 120);
    vertex(280, 110);
    vertex(340, 105);
    endShape(CLOSE);
    
    // Gotland (förenklad)
    fill(colors.background);
    ellipse(650, 350, 40, 25);
    
    // Öland (förenklad)
    fill(colors.background);
    ellipse(580, 320, 30, 15);
}

function drawGeoChips() {
    // Rita alla geo chips med animationer
    mapData.forEach((city, index) => {
        const isHovered = hoveredChip === index;
        const isSelected = selectedChip === index;
        const animationProgress = min((animationTime - city.animationDelay) * 2, 1);
        
        if (animationProgress > 0) {
            drawGeoChip(city, isHovered, isSelected, animationProgress);
        }
    });
}

function drawGeoChip(city, isHovered, isSelected, animationProgress) {
    push();
    
    // Animation easing
    const easedProgress = 1 - pow(1 - animationProgress, 3);
    
    // Hover/selection effects
    const scale = isHovered ? 1.02 : 1.0;
    const shadowIntensity = isHovered ? 0.15 : 0.08;
    const glowIntensity = isSelected ? 0.3 : 0.0;
    
    // Pulse effect för vissa städer
    const pulse = sin(animationTime * 2 + city.pulsePhase) * 0.02;
    const finalScale = scale + pulse;
    
    translate(city.x, city.y);
    scale(finalScale * easedProgress);
    
    // Chip bakgrund med premium shadow
    fill(colors.chipBg);
    stroke(colors.mapStroke);
    strokeWeight(0.5);
    
    // Premium shadow
    fill(colors.chipShadow);
    rect(-75, -35, 150, 70, 20, 2, 2, 2);
    
    // Huvudchip
    fill(colors.chipBg);
    rect(-75, -35, 150, 70, 20);
    
    // Glow effect för selected
    if (isSelected) {
        fill(colors.positive[0], colors.positive[1], colors.positive[2], glowIntensity * 50);
        rect(-75, -35, 150, 70, 20);
    }
    
    // Stadnamn
    fill(colors.primary);
    textAlign(CENTER);
    textSize(14);
    textStyle(BOLD);
    text(city.name, 0, -15);
    
    // Pris
    fill(colors.primary);
    textSize(12);
    textStyle(NORMAL);
    text(formatPrice(city.price), 0, 0);
    
    // Förändring med färg
    const changeColor = city.change > 0 ? colors.positive : 
                       city.change < 0 ? colors.negative : colors.neutral;
    fill(changeColor);
    textSize(11);
    text(formatChange(city.change), 0, 15);
    
    // Sparkline
    drawSparkline(city.trend, city.change, -60, 25, 50, 20);
    
    pop();
}

function drawSparkline(trend, change, x, y, width, height) {
    // Rita mini sparkline
    const sparklineColor = change > 0 ? colors.positive : 
                          change < 0 ? colors.negative : colors.neutral;
    
    // Area fill
    fill(sparklineColor[0], sparklineColor[1], sparklineColor[2], 15);
    noStroke();
    beginShape();
    vertex(x, y + height);
    
    for (let i = 0; i < trend.length; i++) {
        const px = x + (i / (trend.length - 1)) * width;
        const py = y + height - (trend[i] - 40) / 20 * height;
        vertex(px, py);
    }
    
    vertex(x + width, y + height);
    endShape(CLOSE);
    
    // Sparkline line
    stroke(sparklineColor);
    strokeWeight(2);
    strokeCap(ROUND);
    strokeJoin(ROUND);
    noFill();
    
    beginShape();
    for (let i = 0; i < trend.length; i++) {
        const px = x + (i / (trend.length - 1)) * width;
        const py = y + height - (trend[i] - 40) / 20 * height;
        vertex(px, py);
    }
    endShape();
}

function formatPrice(price) {
    // Formatera pris med svenska format
    return price.toLocaleString('sv-SE') + ' kr/m²';
}

function formatChange(change) {
    // Formatera förändring med svenska format
    const sign = change > 0 ? '+' : '';
    return sign + change.toFixed(1) + '%';
}

function mouseMoved() {
    // Kontrollera hover på chips
    let newHoveredChip = -1;
    
    mapData.forEach((city, index) => {
        const distance = dist(mouseX, mouseY, city.x, city.y);
        if (distance < 60) {
            newHoveredChip = index;
        }
    });
    
    if (newHoveredChip !== hoveredChip) {
        hoveredChip = newHoveredChip;
    }
}

function mousePressed() {
    // Kontrollera klick på chips
    mapData.forEach((city, index) => {
        const distance = dist(mouseX, mouseY, city.x, city.y);
        if (distance < 60) {
            selectedChip = index;
            showTooltip(city);
        }
    });
}

function showTooltip(city) {
    // Visa tooltip med fiktiva metrics
    const tooltipTitle = select('#tooltip-title');
    const tooltipMetrics = select('#tooltip-metrics');
    
    tooltipTitle.html(city.name);
    
    // Uppdatera metrics
    tooltipMetrics.html(`
        <div class="tooltip-metric">
            <span class="tooltip-metric-label">Omsättning</span>
            <span class="tooltip-metric-value">${city.metrics.omsattning}</span>
        </div>
        <div class="tooltip-metric">
            <span class="tooltip-metric-label">Utbud</span>
            <span class="tooltip-metric-value">${city.metrics.utbud}</span>
        </div>
        <div class="tooltip-metric">
            <span class="tooltip-metric-label">Riskindex</span>
            <span class="tooltip-metric-value">${city.metrics.riskindex}</span>
        </div>
    `);
    
    // Positionera tooltip
    tooltip.position(mouseX + 20, mouseY + 20);
    tooltip.class('tooltip show');
}

function mouseReleased() {
    // Dölj tooltip vid klick utanför
    if (selectedChip === -1) {
        tooltip.class('tooltip');
    }
}
