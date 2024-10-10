let paranoia = 0;
let maximalna_paranoia = 420;

let dokuda_paranoish = {
    x: maximalna_paranoia,
    y: maximalna_paranoia / 1.5
};

let menlivo_paranoino = false;

let rovno_stiky = 2;
let esli_slishkom_strashno = 100;

let naskolko_ispugan = 17;
let naskolko_uspokoilsya = -6;
let koef_sposoistviya = 45;

let kak_dolgo_plushchit = 23;
let bystro_chy_potroshky = kak_dolgo_plushchit;

let kuda_podgibat = 0;
const suda_podgibat = {
    x: 0,
    y: 0
};

let kak_nedavno_boyalis = [];
let dadya_malyar = null;
let kraska_malyara_pepelnaya = '#abb3b1';
let ganchirka_malyara = 'black';
let DYADYA_MALYAR__ATGIGAY = false;

// Current point of the curve
let currentPoint = { x: 0, y: 0 };

function clikaem_po_domu_dlya_malyarevchika() {
    const tak_a_trechek_de = document.querySelector('audio')
    tak_a_trechek_de.play();
    document.querySelector('#MALYARSKAYA_PERCHATKA').style.display = 'none';
    DYADYA_MALYAR__ATGIGAY = true
}

window.onload = function () {

    document.querySelector('#stuchim_suda_v_akoshko').addEventListener('click', clikaem_po_domu_dlya_malyarevchika)

    const canvas = document.getElementById('canvas_of_infinite_dvizhes');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;   

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Calculate the center of the canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2; // A little bit higher on the vertical component
    const center_paranoiki = centerY / 3;

    centralnyi_dotik_that_we_dropik(kraska_malyara_pepelnaya);

    // Initialize the starting point
    currentPoint = { x: centerX, y: center_paranoiki };
    targetPoint = { x: centerX, y: center_paranoiki };

    // Function to update paranoia level
    function updateParanoia(naskolko_ispugan) {
        if (!DYADYA_MALYAR__ATGIGAY)
            return
        if (menlivo_paranoino && dokuda_paranoish.x <= centerX)
            dokuda_paranoish.x += 2;

        const a_naskolko_ispugan = Math.random() * (naskolko_ispugan - naskolko_uspokoilsya) + naskolko_uspokoilsya * (1 + koef_sposoistviya / 100);
        // const a_naskolko_ispugan = Math.random() * naskolko_ispugan;
        paranoia += a_naskolko_ispugan;
        kuda_podgibat = uznat_kuda_podgibat(paranoia);

        currentPoint.x = targetPoint.x;
        currentPoint.y = targetPoint.y;

        targetPoint.x = centerX + paranoia;

        suda_podgibat.x = currentPoint.x + (targetPoint.x - currentPoint.x) / 2;
        suda_podgibat.y = center_paranoiki + kuda_podgibat;

        bystro_chy_potroshky = (Math.random() + 10) * kak_dolgo_plushchit;

        kak_nedavno_boyalis.push({
            currentPointX: currentPoint.x,
            currentPointY: currentPoint.y,
            sudaPodgibatX: suda_podgibat.x,
            sudaPodgibatY: suda_podgibat.y,
            targetPointX: targetPoint.x,
            targetPointY: targetPoint.y,
            bystro_chy_potroshky: bystro_chy_potroshky,
            naskolko_ispugalis: a_naskolko_ispugan
        });

        if (paranoia >= dokuda_paranoish.x && esli_slishkom_strashno) {
            clearInterval(dadya_malyar);
            let current = 1;
            while (kak_nedavno_boyalis.length) {
                let current_boyazn = kak_nedavno_boyalis.at(-1);

                setTimeout(() =>
                    animatePathDrawing(ctx,
                        current_boyazn.currentPointX,
                        current_boyazn.currentPointY,
                        current_boyazn.sudaPodgibatX,
                        current_boyazn.sudaPodgibatY,
                        current_boyazn.targetPointX,
                        current_boyazn.targetPointY,
                        current_boyazn.bystro_chy_potroshky,
                        ganchirka_malyara
                    ), current);

                paranoia = Math.max(0, paranoia - current_boyazn.naskolko_ispugalis);


                targetPoint.x = current_boyazn.targetPointX;
                targetPoint.y = current_boyazn.targetPointY;

                kak_nedavno_boyalis.pop();
                current += 5;
            }

            kak_nedavno_boyalis = [];
            setTimeout(() => {
                dadya_malyar = setInterval(() => updateParanoia(naskolko_ispugan), kak_dolgo_plushchit);
            }, current)

            paranoia = 0;
            if (menlivo_paranoino)
                dokuda_paranoish.x = paranoia + 30;

            return
        }

        animatePathDrawing(ctx,
            currentPoint.x,
            currentPoint.y,
            suda_podgibat.x,
            suda_podgibat.y,
            targetPoint.x,
            targetPoint.y,
            bystro_chy_potroshky);
    }

    function centralnyi_dotik_that_we_dropik(color) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, 2, 0, 2 * Math.PI);

        ctx.fillStyle = color;
        ctx.fill();
    }


    function uznat_kuda_podgibat(paranoia) {
        const spredik = Math.max(0, (paranoia / dokuda_paranoish.x) * dokuda_paranoish.y - rovno_stiky);
        const razdvinul_spredik = {
            vgoru: spredik,
            vnyz: -spredik
        };

        const tak_kuda_podgibat = Math.random() * (razdvinul_spredik.vgoru - razdvinul_spredik.vnyz) + razdvinul_spredik.vnyz;
        return tak_kuda_podgibat;
    }

    function animatePathDrawing(ctx, x0, y0, x1, y1, x2, y2, duration, color = kraska_malyara_pepelnaya) {
        var start = null;

        var step = function animatePathDrawingStep(timestamp) {
            if (start === null)
                start = timestamp;

            var delta = timestamp - start,
                progress = Math.min(delta / duration, 1);

            // Draw curve
            drawBezierSplit(ctx, x0, y0, x1, y1, x2, y2, 0, progress, color);
            drawBezierSplit(ctx, 2 * centerX - x0, y0, 2 * centerX - x1, y1, 2 * centerX - x2, y2, 0, progress, color);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }

    // Example: Increase paranoia level continuously
    dadya_malyar = setInterval(() => updateParanoia(naskolko_ispugan), kak_dolgo_plushchit);

    // Event listener for arrow keys to change skorost_ispuga
    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
            naskolko_ispugan -= 1; // Decrease but not below 1
        } else if (event.key === 'ArrowRight') {
            naskolko_ispugan += 1; // Increase
        } else if (event.key === 'm') {
            menlivo_paranoino = !menlivo_paranoino;
            if (!menlivo_paranoino)
                dokuda_paranoish.x = maximalna_paranoia; // Increase
        } else if (event.key === 'ArrowUp') {
            koef_sposoistviya = Math.min(100, koef_sposoistviya + 5);
        } else if (event.key === 'ArrowDown') {
            koef_sposoistviya = Math.max(0, koef_sposoistviya - 5);
        }
    });

    // };


    /**
     * Draws a splitted bezier-curve
     * 
     * @param ctx       The canvas context to draw to
     * @param x0        The x-coord of the start point
     * @param y0        The y-coord of the start point
     * @param x1        The x-coord of the control point
     * @param y1        The y-coord of the control point
     * @param x2        The x-coord of the end point
     * @param y2        The y-coord of the end point
     * @param t0        The start ratio of the splitted bezier from 0.0 to 1.0
     * @param t1        The start ratio of the splitted bezier from 0.0 to 1.0
     */
    function drawBezierSplit(ctx, x0, y0, x1, y1, x2, y2, t0, t1, color = kraska_malyara_pepelnaya) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = color === ganchirka_malyara ? 3 : 1;

        ctx.shadowOffsetX = x0 > centerX ? -7 : 7;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 40;

        if (0.0 == t0 && t1 == 1.0) {
            ctx.moveTo(x0, y0);
            ctx.quadraticCurveTo(x1, y1, x2, y2);
        } else if (t0 != t1) {
            var t00 = t0 * t0,
                t01 = 1.0 - t0,
                t02 = t01 * t01,
                t03 = 2.0 * t0 * t01;

            var nx0 = t02 * x0 + t03 * x1 + t00 * x2,
                ny0 = t02 * y0 + t03 * y1 + t00 * y2;

            t00 = t1 * t1;
            t01 = 1.0 - t1;
            t02 = t01 * t01;
            t03 = 2.0 * t1 * t01;

            var nx2 = t02 * x0 + t03 * x1 + t00 * x2,
                ny2 = t02 * y0 + t03 * y1 + t00 * y2;

            var nx1 = lerp(lerp(x0, x1, t0), lerp(x1, x2, t0), t1),
                ny1 = lerp(lerp(y0, y1, t0), lerp(y1, y2, t0), t1);

            ctx.moveTo(nx0, ny0);
            ctx.quadraticCurveTo(nx1, ny1, nx2, ny2);
        }



        ctx.stroke();
        ctx.closePath();
    }

    /**
     * Linearly interpolates between two numbers
     */
    function lerp(v0, v1, t) {
        return (1.0 - t) * v0 + t * v1;
    }

};