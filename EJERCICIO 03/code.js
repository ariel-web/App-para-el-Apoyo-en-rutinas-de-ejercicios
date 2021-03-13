
var net;
const webcamE1 = document.getElementById("webcam");
var count = 0;
var n1 = 0, n2=0, n3=0;
const clasificador = knnClassifier.create();
var webcam;
var m
//Predecir lo que se esta viendoensaje = [];
let num = document.getElementById('num');
const movimientos = [];
function parar() {
    op = false;
    app();
    mensaje = [];
    document.getElementById("msg").innerHTML = '';
    count=0;
}

function iniciar() {
    op = true;
    app();
}

async function app() {

    net = await mobilenet.load();
    webcam = await tf.data.webcam(webcamE1);

    while (op) {
      
        const img = await webcam.capture();
        const result = await net.classify(img);
        const activacion = net.infer(img, "conv_preds");
        var result2;
        try {
            result2 = await clasificador.predictClass(activacion);
            //document.getElementById("msg").innerHTML = mensaje + ": "  + (result2.label+1);
        } catch (error) {
            result2 = {}
        }
        const clases = ["mov1", "mov2", "mov3", "mov4","mov5"];
        const comparar = ["mov1","mov2","mov3"];
        
        if (clases[n3] === comparar[0] && clases[n2] === comparar[1]  && clases[n1] === comparar[2]) {
            count=count+1;   
            document.getElementById("msg").innerHTML = mensaje + "Repeticiones: " + count;
            if (count  == 50){
                alert("ejercios terminados");
            }
        }
        if(n1 !== result2.label){
            n3=n2;
            n2=n1;
            n1=result2.label;
        }

        
        try {
            //document.getElementById("console2").innerHTML = "Prediccion del Clasificador:" + clases[result2.label] + "=" + anterior;
            document.getElementById("console2").innerHTML = "P:" + "|" + n1 + "|" + n2 + "|" + n3;

            if (!mensaje.includes(clases[result2.label]) && clases[result2.label] != null) {
            //    mensaje.push(clases[result2.label]);
            }


//            document.getElementById("msg").innerHTML = mensaje + ": " + contador2 + mensaje.probability;
            //document.getElementById("msg2").innerHTML = mensaje + "contador 2: " + contador2;
            setTimeout(() => { console.log("World!"); }, 20000);


        } catch (error) {

        }
        //eliminar el tensor de la memoria
        img.dispose();
        await tf.nextFrame();

    }
}

async function addExample(numero) {
    console.log("Ejemplo agregado");
    const img = await webcam.capture();

    const activation = net.infer(img, true);
    console.log(activation);
    clasificador.addExample(activation,numero);
    img.dispose();
}

app();

/*
            if (clases[result2.label] == comparar[0] && actual == comparar[1]) {
                contador = contador + 1;
            }
            nuevo = clases[result2.label]
            if (ant2 == comparar[0] && ant1 == comparar[1]  && nuevo == comparar[2]) {
                contador2 = contador2 + 1;
            }
*/