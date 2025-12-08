// Hellman & Partners Market Intelligence - Premium Nordic Fintech Dashboard
// Alla värden är illustrativa och baseras inte på verkliga data eller formler

let chartData = [];
let targetData = [];
let currentData = [];
const dataPoints = 12; // 12 månader
const chartWidth = 900;
const chartHeight = 450;
const padding = 80;

// Premium easing för luxuös känsla
let easing = 0.04;

// Kontrollera användarens motion preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
    easing = 0.015;
}

// DOM element
let interestSlider, demandSlider, constructionSlider;
let interestValue, demandValue, constructionValue;
let statusBadge, statusTitle, statusDescription;

// Premium färgpalett (Nordic fintech luxury)
const colors = {
    background: [248, 250, 252], // #F8FAFC
    backgroundSecondary: [241, 245, 249], // #F1F5F9
    primary: [15, 23, 42], // #0F172A
    secondary: [100, 116, 139], // #64748B
    accentBlue: [37, 99, 235], // #2563EB
    accentBlueLight: [59, 130, 246], // #3B82F6
    accentGreen: [16, 185, 129], // #10B981
    accentGreenLight: [52, 211, 153], // #34D399
    accentOrange: [245, 158, 11], // #F59E0B
    accentOrangeLight: [251, 191, 36], // #FBBF24
    grid: [226, 232, 240], // #E2E8F0
    gridLight: [203, 213, 225], // #CBD5E1
    shadow: [15, 23, 42, 0.08]
};

function setup() {
    // Skapa premium canvas
    const canvas = createCanvas(chartWidth, chartHeight);
    canvas.parent('chart-canvas');
    
    // Hämta DOM element
    interestSlider = select('#interest-slider');
    demandSlider = select('#demand-slider');
    constructionSlider = select('#construction-slider');
    
    interestValue = select('#interest-value');
    demandValue = select('#demand-value');
    constructionValue = select('#construction-value');
    
    statusBadge = select('#status-badge');
    statusTitle = select('#status-title');
    statusDescription = select('#status-description');
    
    // Generera initial data
    generateInitialData();
    
    // Sätt upp event listeners
    interestSlider.input(updateSliders);
    demandSlider.input(updateSliders);
    constructionSlider.input(updateSliders);
    
    // Initial status
    updateStatus();
}

function draw() {
    // Premium gradient bakgrund
    drawGradientBackground();
    
    // Uppdatera data med luxuös easing
    updateChartData();
    
    // Rita premium chart
    drawLuxuryChart();
}

function drawGradientBackground() {
    // Skapa subtil gradient bakgrund
    for (let y = 0; y < chartHeight; y++) {
        const interp = y / chartHeight;
        const r = lerp(colors.background[0], colors.backgroundSecondary[0], interp);
        const g = lerp(colors.background[1], colors.backgroundSecondary[1], interp);
        const b = lerp(colors.background[2], colors.backgroundSecondary[2], interp);
        stroke(r, g, b);
        line(0, y, chartWidth, y);
    }
}

function generateInitialData() {
    // Generera fiktiv initial data med realistisk variation
    chartData = [];
    targetData = [];
    currentData = [];
    
    for (let i = 0; i < dataPoints; i++) {
        const baseValue = 100;
        const timeFactor = i / (dataPoints - 1);
        
        // Fiktiv trend med subtil variation
        const trend = sin(timeFactor * PI * 1.2) * 12;
        const noise = (random() - 0.5) * 8;
        const seasonal = sin(timeFactor * PI * 3.5) * 4;
        
        const value = baseValue + trend + noise + seasonal;
        chartData.push(value);
        targetData.push(value);
        currentData.push(value);
    }
}

function updateSliders() {
    // Uppdatera UI värden
    const interest = int(interestSlider.value());
    const demand = int(demandSlider.value());
    const construction = int(constructionSlider.value());
    
    interestValue.html(interest + '%');
    demandValue.html(demand + '%');
    constructionValue.html(construction + '%');
    
    // Beräkna ny target data (fiktiv logik)
    calculateTargetData(interest, demand, construction);
    
    // Uppdatera status med smooth transition
    updateStatus();
}

function calculateTargetData(interest, demand, construction) {
    // Fiktiv beräkning - INTE baserat på verkliga formler
    // Endast illustrativ för demo-ändamål
    
    for (let i = 0; i < dataPoints; i++) {
        const timeFactor = i / (dataPoints - 1);
        const baseValue = 100;
        
        // Fiktiva påverkan från sliders
        const interestEffect = (interest - 50) * 0.5;
        const demandEffect = (demand - 50) * 0.6;
        const constructionEffect = (construction - 50) * 0.4;
        
        // Lägg till realistisk noise
        const noise = (random() - 0.5) * 10;
        
        // Fiktiv scenario-baserad trend
        let scenarioTrend = 0;
        if (demand > 80 && interest < 20) {
            scenarioTrend = 25; // "Tillväxt" scenario
        } else if (interest > 80 && demand < 20) {
            scenarioTrend = -20; // "Osäker" scenario
        } else if (construction > 85 && demand > 70) {
            scenarioTrend = 18; // "Stabil" med byggboom
        } else {
            scenarioTrend = 5; // "Stabil" basfall
        }
        
        // Lägg till subtil cyklisk variation
        const cycle = sin(timeFactor * PI * 2.5) * 6;
        
        const newValue = baseValue + interestEffect + demandEffect + constructionEffect + scenarioTrend + cycle + noise;
        targetData[i] = newValue;
    }
}

function updateChartData() {
    // Luxuös easing mot target data
    for (let i = 0; i < dataPoints; i++) {
        currentData[i] = lerp(currentData[i], targetData[i], easing);
    }
}

function drawLuxuryChart() {
    // Rita subtila gridlines
    drawSubtleGrid();
    
    // Rita premium gradient area
    drawPremiumGradientArea();
    
    // Rita smooth chart line med glow
    drawSmoothLineWithGlow();
    
    // Rita data points med glow
    drawDataPointsWithGlow();
}

function drawSubtleGrid() {
    stroke(colors.grid);
    strokeWeight(0.5);
    
    // Vertikala gridlines
    for (let i = 0; i <= 8; i++) {
        const x = padding + (i / 8) * (chartWidth - 2 * padding);
        line(x, padding, x, chartHeight - padding);
    }
    
    // Horisontella gridlines
    for (let i = 0; i <= 6; i++) {
        const y = padding + (i / 6) * (chartHeight - 2 * padding);
        line(padding, y, chartWidth - padding, y);
    }
}

function drawPremiumGradientArea() {
    // Skapa luxuös gradient area under linjen
    noStroke();
    
    // Gradient från accent blue med opacity
    for (let i = 0; i < dataPoints - 1; i++) {
        const x1 = padding + (i / (dataPoints - 1)) * (chartWidth - 2 * padding);
        const x2 = padding + ((i + 1) / (dataPoints - 1)) * (chartWidth - 2 * padding);
        
        const y1 = map(currentData[i], 70, 140, chartHeight - padding, padding);
        const y2 = map(currentData[i + 1], 70, 140, chartHeight - padding, padding);
        
        // Premium gradient från accent blue till transparent
        const alpha1 = map(i, 0, dataPoints - 1, 120, 30);
        const alpha2 = map(i + 1, 0, dataPoints - 1, 120, 30);
        
        fill(colors.accentBlue[0], colors.accentBlue[1], colors.accentBlue[2], alpha1);
        beginShape();
        vertex(x1, chartHeight - padding);
        vertex(x1, y1);
        vertex(x2, y2);
        vertex(x2, chartHeight - padding);
        endShape(CLOSE);
    }
}

function drawSmoothLineWithGlow() {
    // Rita smooth cubic curve med glow effect
    stroke(colors.accentBlue);
    strokeWeight(4);
    strokeCap(ROUND);
    strokeJoin(ROUND);
    noFill();
    
    beginShape();
    for (let i = 0; i < dataPoints; i++) {
        const x = padding + (i / (dataPoints - 1)) * (chartWidth - 2 * padding);
        const y = map(currentData[i], 70, 140, chartHeight - padding, padding);
        vertex(x, y);
    }
    endShape();
    
    // Lägg till subtil glow effect
    stroke(colors.accentBlue[0], colors.accentBlue[1], colors.accentBlue[2], 60);
    strokeWeight(8);
    beginShape();
    for (let i = 0; i < dataPoints; i++) {
        const x = padding + (i / (dataPoints - 1)) * (chartWidth - 2 * padding);
        const y = map(currentData[i], 70, 140, chartHeight - padding, padding);
        vertex(x, y);
    }
    endShape();
}

function drawDataPointsWithGlow() {
    // Rita premium data points med glow
    for (let i = 0; i < dataPoints; i++) {
        const x = padding + (i / (dataPoints - 1)) * (chartWidth - 2 * padding);
        const y = map(currentData[i], 70, 140, chartHeight - padding, padding);
        
        // Glow effect
        fill(colors.accentBlue[0], colors.accentBlue[1], colors.accentBlue[2], 40);
        noStroke();
        ellipse(x, y, 16, 16);
        
        // Huvudpunkt
        fill(colors.accentBlue);
        noStroke();
        ellipse(x, y, 8, 8);
        
        // Inner glow
        fill(255, 255, 255, 100);
        ellipse(x, y, 4, 4);
    }
}

function updateStatus() {
    const interest = int(interestSlider.value());
    const demand = int(demandSlider.value());
    const construction = int(constructionSlider.value());
    
    // Fiktiv logik för marknadsstatus
    let status, title, description, badgeClass;
    
    if (demand > 80 && interest < 20) {
        status = "Tillväxt";
        title = "Marknadsläge: Tillväxt";
        description = "Stark efterfrågan och låg ränta driver marknaden framåt. Illustrativ förändring: +4.2% / 12 månader.";
        badgeClass = "growth";
    } else if (interest > 80 && demand < 20) {
        status = "Osäker marknad";
        title = "Marknadsläge: Osäker marknad";
        description = "Blandade signaler skapar osäkerhet i marknaden. Illustrativ förändring: -0.3% / 12 månader.";
        badgeClass = "uncertain";
    } else if (construction > 85 && demand > 70) {
        status = "Stabil marknad";
        title = "Marknadsläge: Stabil marknad";
        description = "Balanserad utveckling med ökad byggaktivitet. Illustrativ förändring: +2.1% / 12 månader.";
        badgeClass = "stable";
    } else {
        status = "Stabil marknad";
        title = "Marknadsläge: Stabil marknad";
        description = "Marknaden visar stabil utveckling med balanserade faktorer. Illustrativ förändring: +1.8% / 12 månader.";
        badgeClass = "stable";
    }
    
    // Uppdatera UI med smooth transitions
    statusBadge.html(status);
    statusBadge.class('status-badge ' + badgeClass);
    statusTitle.html(title);
    statusDescription.html(description);
}