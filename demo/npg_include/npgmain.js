
//----------------------------------START-OF-SlIDERS
if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}

let app = (() => {

  const $svgLine = document.querySelector('svg .line');
  const $svgLineShadow = document.querySelector('svg .line-shadow');
  const sliderThumbSize = 20;
  const sliderHeight = 300;
  const svgViewBoxHeight = 100;
  const svgViewBoxThumbLimit = sliderThumbSize / 2 * (svgViewBoxHeight / sliderHeight);
  const svgViewBoxGraphMax = svgViewBoxHeight - svgViewBoxThumbLimit;
  const svgViewBoxGraphMin = svgViewBoxThumbLimit;

  let ranges = {
    range1: null,
    range2: null,
    range3: null,
    range4: null,
    range5: null,
    range6: null,
    range7: null
  };

  // Only the y values changes
  let points = {
    begin: {
      x: 10,
      y: 0
    },

    point1: {
      x: 10,
      y: 0
    },

    control1: {
      x: 20,
      y: 10
    },

    control2: {
      x: 20,
      y: 0
    },

    point2: {
      x: 30,
      y: 0
    },

    control3: {
      x: 40,
      y: 0
    },

    point3: {
      x: 50,
      y: 0
    },

    control4: {
      x: 60,
      y: 0
    },

    point4: {
      x: 70,
      y: 0
    },

    control5: {
      x: 80,
      y: 0
    },

    point5: {
      x: 90,
      y: 0
    },

    control6: {
      x: 100,
      y: 0
    },

    point6: {
      x: 110,
      y: 0
    },

    control7: {
      x: 120,
      y: 0
    },

    point7: {
      x: 130,
      y: 0
    }
  };



  function mapDataRange(value) {
    // stackoverflow.com/a/929107/5707008
    // return (((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin
    return (value - 0) * (svgViewBoxGraphMax - svgViewBoxGraphMin) / (svgViewBoxHeight - 0) + svgViewBoxGraphMin;
  }

  function updateSlider($element) {
    if ($element) {

      let rangeIndex = $element.getAttribute('data-slider-index'),
        range = ranges[rangeIndex],
        value = $element.value;

      if (range === value) {
        return; // No value change, no need to update then
      }
      let parent = $element.parentElement,
        $thumb = parent.querySelector('.range-slider__thumb'),
        $bar = parent.querySelector('.range-slider__bar'),
        pct = value * ((sliderHeight - sliderThumbSize) / sliderHeight);

      // Update state
      ranges[rangeIndex] = value;
      console.log(rangeIndex);
      mainPicture = document.getElementById("main");
      canvas1 = document.getElementById("foptsdiv");
      if (rangeIndex == "range1") {


        if (mainPicture != null) {
          mainPicture.src = GetPictureC(parent, mainPicture, value);
        } else if (canvas1 != null) {
          console.log("notnull");
          parent.lastChild.textContent = `C=0.${value}`;
          refreshC(value / 100);
        }
      } else if (rangeIndex == "range2") {

        if (mainPicture != null) {
          console.log("mew");
          mainPicture.src = GetPictureG(parent, mainPicture, value);
          console.log(mainPicture.src);
        }

      } else if (rangeIndex == "range3") {
        if (mainPicture != null) {
          console.log("mew");
          mainPicture.src = GetPictureK(parent, mainPicture, value);
          console.log(mainPicture.src);
        }
      }


      $thumb.style.bottom = `${pct}%`;
      $bar.style.height = `calc(${pct}% + ${sliderThumbSize / 2}px)`;

      renderSliderGraph();
    }
  }
  function GetPictureK(parent, mainPicture, value) {
    console.log(value);
    pathes = mainPicture.src.split('/')
    if (value < 34) {
      endPath = "linear"
      parent.lastChild.textContent = `K=linear`;
    } else if (value < 67) {
      endPath = "poly"
      parent.lastChild.textContent = `K=poly`;
    } else {
      endPath = "rbf"
      parent.lastChild.textContent = `K=rbf`;
    }
    path = "./" + pathes[1] + "/" + pathes[2] + "/" + endPath + "/" + pathes[4] + "/" + pathes[5];
    return path;
  }
  function GetPictureG(parent, mainPicture, value) {
    console.log(value);
    pathes = mainPicture.src.split('/')
    if (value < 20) {
      endPath = "1"
      parent.lastChild.textContent = `G=1`;
    } else if (value < 40) {
      endPath = "2"
      parent.lastChild.textContent = `G=2`;
    } else if (value < 60) {
      endPath = "3"
      parent.lastChild.textContent = `G=3`;
    } else if (value < 80) {
      endPath = "4"
      parent.lastChild.textContent = `G=4`;
    } else {
      endPath = "5"
      parent.lastChild.textContent = `G=5`;
    }
    path = "./" + pathes[1] + "/" + pathes[2] + "/" + pathes[3] + "/" + endPath + "/" + pathes[5];
    return path;
  }
  function GetPictureC(parent, mainPicture, value) {
    console.log(value);
    pathes = mainPicture.src.split('/')
    if (value < 20) {
      endPath = "0.01.png"
      parent.lastChild.textContent = `C=0.01`;
    } else if (value < 40) {
      endPath = "0.1.png"
      parent.lastChild.textContent = `C=0.1`;
    } else if (value < 60) {
      endPath = "1.png"
      parent.lastChild.textContent = `C=1`;
    } else if (value < 80) {
      endPath = "10.png"
      parent.lastChild.textContent = `C=10`;
    } else {
      endPath = "100.png"
      parent.lastChild.textContent = `C=100`;
    }
    path = "./" + pathes[1] + "/" + pathes[2] + "/" + pathes[3] + "/" + pathes[4] + "/" + endPath;
    return path;
  }
  function updatePoints() {
    // Convert from percentage to coordinate values    
    // Calculate and floor the values
    points.point1.y = svgViewBoxHeight - svgViewBoxHeight * ranges.range1 / 100 | 0;
    points.point2.y = svgViewBoxHeight - svgViewBoxHeight * ranges.range2 / 100 | 0;
    points.point3.y = svgViewBoxHeight - svgViewBoxHeight * ranges.range3 / 100 | 0;
    points.point4.y = svgViewBoxHeight - svgViewBoxHeight * ranges.range4 / 100 | 0;
    points.point5.y = svgViewBoxHeight - svgViewBoxHeight * ranges.range5 / 100 | 0;
    points.point6.y = svgViewBoxHeight - svgViewBoxHeight * ranges.range6 / 100 | 0;
    points.point7.y = svgViewBoxHeight - svgViewBoxHeight * ranges.range7 / 100 | 0;

    const max = svgViewBoxGraphMax;
    const min = svgViewBoxGraphMin;

    points.point1.y = mapDataRange(points.point1.y);
    points.point2.y = mapDataRange(points.point2.y);
    points.point3.y = mapDataRange(points.point3.y);
    points.point4.y = mapDataRange(points.point4.y);
    points.point5.y = mapDataRange(points.point5.y);
    points.point6.y = mapDataRange(points.point6.y);
    points.point7.y = mapDataRange(points.point7.y);

    // Update Y for the other points
    points.begin.y = points.point1.y;
    points.control1.y = points.point1.y;
    points.control2.y = points.point2.y;
    points.control3.y = points.point3.y;
    points.control4.y = points.point4.y;
    points.control5.y = points.point5.y;
    points.control6.y = points.point6.y;
    points.control7.y = points.point7.y;
  }

  function getInterpolatedLine(type) {

    let shadowOffset = 0;
    if (type === 'shadow') {
      shadowOffset = 10; // simple simulation, no fancy shadow algorithm
    }

    return 'M {0},{1} L {2},{3} C {4},{5} {6},{7} {8},{9} S {10} {11}, {12} {13} S {14} {15}, {16} {17} S {18} {19}, {20} {21} S {22} {23}, {24} {25} S {26} {27}, {28} {29}'.format(
      // M
      points.begin.x, points.begin.y,
      // L
      points.point1.x, points.point1.y,
      // C
      points.control1.x, points.control1.y,
      points.control2.x, points.control2.y + shadowOffset,
      points.point2.x, points.point2.y + shadowOffset,
      // S
      points.control3.x, points.control3.y,
      points.point3.x, points.point3.y,
      // S
      points.control4.x, points.control4.y + shadowOffset,
      points.point4.x, points.point4.y + shadowOffset,
      // S
      points.control5.x, points.control5.y,
      points.point5.x, points.point5.y,
      // S
      points.control6.x, points.control6.y + shadowOffset,
      points.point6.x, points.point6.y + shadowOffset,
      // S
      points.control7.x, points.control7.y,
      points.point7.x, points.point7.y);

  }

  function reset() {
    const inputs = app.inputs;
    inputs.forEach(input => input.value = 50);
    inputs.forEach(input => app.updateSlider(input));



  }

  function renderSliderGraph() {
    updatePoints();
    $svgLine.setAttribute('d', getInterpolatedLine());
    $svgLineShadow.setAttribute('d', getInterpolatedLine('shadow'));
  }

  function selectPreset(type) {
    // Generate random graph
    const inputs = app.inputs;
    var t;
    inputs.forEach(input => { t = Math.random() * 100 | 0; input.value = t });
    inputs.forEach(input => app.updateSlider(input));
  }

  return {
    inputs: [].slice.call(document.querySelectorAll('.sliders input')),
    updateSlider,
    reset,
    selectPreset
  };


})();

(function initAndSetupTheSliders() {
  const inputs = app.inputs;
  let index = 1;
  inputs.forEach(input => input.setAttribute('data-slider-index', 'range' + index++));
  inputs.forEach(input => input.value = 50);
  inputs.forEach(input => app.updateSlider(input));
  // Cross-browser support where value changes instantly as you drag the handle, therefore two event types.
  inputs.forEach(input => input.addEventListener('input', element => app.updateSlider(input)));
  inputs.forEach(input => input.addEventListener('change', element => app.updateSlider(input)));
  app.selectPreset('custom');
})();
var svmjs = (function (exports) {
  //-----------------------------------------END-OF-SLIDERS------------------------------












  /*
    This is a binary SVM and is trained using the SMO algorithm.
    Reference: "The Simplified SMO Algorithm" (http://math.unt.edu/~hsp0009/smo.pdf)
    
    Simple usage example:
    svm = svmjs.SVM();
    svm.train(data, labels);
    testlabels = svm.predict(testdata);
  */
  var SVM = function (options) {
  }

  SVM.prototype = {

    // data is NxD array of floats. labels are 1 or -1.
    train: function (data, labels, options) {

      // we need these in helper functions
      this.data = data;
      this.labels = labels;

      // parameters
      options = options || {};
      var C = options.C || 1.0; // C value. Decrease for more regularization
      var tol = options.tol || 1e-4; // numerical tolerance. Don't touch unless you're pro
      var alphatol = options.alphatol || 1e-7; // non-support vectors for space and time efficiency are truncated. To guarantee correct result set this to 0 to do no truncating. If you want to increase efficiency, experiment with setting this little higher, up to maybe 1e-4 or so.
      var maxiter = options.maxiter || 10000; // max number of iterations
      var numpasses = options.numpasses || 10; // how many passes over data with no change before we halt? Increase for more precision.

      // instantiate kernel according to options. kernel can be given as string or as a custom function
      var kernel = linearKernel;
      this.kernelType = "linear";
      if ("kernel" in options) {
        if (typeof options.kernel === "string") {
          // kernel was specified as a string. Handle these special cases appropriately
          if (options.kernel === "linear") {
            this.kernelType = "linear";
            kernel = linearKernel;
          }
          if (options.kernel === "rbf") {
            var rbfSigma = options.rbfsigma || 0.5;
            this.rbfSigma = rbfSigma; // back this up
            this.kernelType = "rbf";
            kernel = makeRbfKernel(rbfSigma);
          }
        } else {
          // assume kernel was specified as a function. Let's just use it
          this.kernelType = "custom";
          kernel = options.kernel;
        }
      }

      // initializations
      this.kernel = kernel;
      this.N = data.length; var N = this.N;
      this.D = data[0].length; var D = this.D;
      this.alpha = zeros(N);
      this.b = 0.0;
      this.usew_ = false; // internal efficiency flag

      // Cache kernel computations to avoid expensive recomputation.
      // This could use too much memory if N is large.
      if (options.memoize) {
        this.kernelResults = new Array(N);
        for (var i = 0; i < N; i++) {
          this.kernelResults[i] = new Array(N);
          for (var j = 0; j < N; j++) {
            this.kernelResults[i][j] = kernel(data[i], data[j]);
          }
        }
      }

      // run SMO algorithm
      var iter = 0;
      var passes = 0;
      while (passes < numpasses && iter < maxiter) {

        var alphaChanged = 0;
        for (var i = 0; i < N; i++) {

          var Ei = this.marginOne(data[i]) - labels[i];
          if ((labels[i] * Ei < -tol && this.alpha[i] < C)
            || (labels[i] * Ei > tol && this.alpha[i] > 0)) {

            // alpha_i needs updating! Pick a j to update it with
            var j = i;
            while (j === i) j = randi(0, this.N);
            var Ej = this.marginOne(data[j]) - labels[j];

            // calculate L and H bounds for j to ensure we're in [0 C]x[0 C] box
            ai = this.alpha[i];
            aj = this.alpha[j];
            var L = 0; var H = C;
            if (labels[i] === labels[j]) {
              L = Math.max(0, ai + aj - C);
              H = Math.min(C, ai + aj);
            } else {
              L = Math.max(0, aj - ai);
              H = Math.min(C, C + aj - ai);
            }

            if (Math.abs(L - H) < 1e-4) continue;

            var eta = 2 * this.kernelResult(i, j) - this.kernelResult(i, i) - this.kernelResult(j, j);
            if (eta >= 0) continue;

            // compute new alpha_j and clip it inside [0 C]x[0 C] box
            // then compute alpha_i based on it.
            var newaj = aj - labels[j] * (Ei - Ej) / eta;
            if (newaj > H) newaj = H;
            if (newaj < L) newaj = L;
            if (Math.abs(aj - newaj) < 1e-4) continue;
            this.alpha[j] = newaj;
            var newai = ai + labels[i] * labels[j] * (aj - newaj);
            this.alpha[i] = newai;

            // update the bias term
            var b1 = this.b - Ei - labels[i] * (newai - ai) * this.kernelResult(i, i)
              - labels[j] * (newaj - aj) * this.kernelResult(i, j);
            var b2 = this.b - Ej - labels[i] * (newai - ai) * this.kernelResult(i, j)
              - labels[j] * (newaj - aj) * this.kernelResult(j, j);
            this.b = 0.5 * (b1 + b2);
            if (newai > 0 && newai < C) this.b = b1;
            if (newaj > 0 && newaj < C) this.b = b2;

            alphaChanged++;

          } // end alpha_i needed updating
        } // end for i=1..N

        iter++;
        //console.log("iter number %d, alphaChanged = %d", iter, alphaChanged);
        if (alphaChanged == 0) passes++;
        else passes = 0;

      } // end outer loop

      // if the user was using a linear kernel, lets also compute and store the
      // weights. This will speed up evaluations during testing time
      if (this.kernelType === "linear") {

        // compute weights and store them
        this.w = new Array(this.D);
        for (var j = 0; j < this.D; j++) {
          var s = 0.0;
          for (var i = 0; i < this.N; i++) {
            s += this.alpha[i] * labels[i] * data[i][j];
          }
          this.w[j] = s;
          this.usew_ = true;
        }
      } else {

        // okay, we need to retain all the support vectors in the training data,
        // we can't just get away with computing the weights and throwing it out

        // But! We only need to store the support vectors for evaluation of testing
        // instances. So filter here based on this.alpha[i]. The training data
        // for which this.alpha[i] = 0 is irrelevant for future. 
        var newdata = [];
        var newlabels = [];
        var newalpha = [];
        for (var i = 0; i < this.N; i++) {
          //console.log("alpha=%f", this.alpha[i]);
          if (this.alpha[i] > alphatol) {
            newdata.push(this.data[i]);
            newlabels.push(this.labels[i]);
            newalpha.push(this.alpha[i]);
          }
        }

        // store data and labels
        this.data = newdata;
        this.labels = newlabels;
        this.alpha = newalpha;
        this.N = this.data.length;
        //console.log("filtered training data from %d to %d support vectors.", data.length, this.data.length);
      }

      var trainstats = {};
      trainstats.iters = iter;
      return trainstats;
    },

    // inst is an array of length D. Returns margin of given example
    // this is the core prediction function. All others are for convenience mostly
    // and end up calling this one somehow.
    marginOne: function (inst) {

      var f = this.b;
      // if the linear kernel was used and w was computed and stored,
      // (i.e. the svm has fully finished training)
      // the internal class variable usew_ will be set to true.
      if (this.usew_) {

        // we can speed this up a lot by using the computed weights
        // we computed these during train(). This is significantly faster
        // than the version below
        for (var j = 0; j < this.D; j++) {
          f += inst[j] * this.w[j];
        }

      } else {

        for (var i = 0; i < this.N; i++) {
          f += this.alpha[i] * this.labels[i] * this.kernel(inst, this.data[i]);
        }
      }

      return f;
    },

    predictOne: function (inst) {
      return this.marginOne(inst) > 0 ? 1 : -1;
    },

    // data is an NxD array. Returns array of margins.
    margins: function (data) {

      // go over support vectors and accumulate the prediction. 
      var N = data.length;
      var margins = new Array(N);
      for (var i = 0; i < N; i++) {
        margins[i] = this.marginOne(data[i]);
      }
      return margins;

    },

    kernelResult: function (i, j) {
      if (this.kernelResults) {
        return this.kernelResults[i][j];
      }
      return this.kernel(this.data[i], this.data[j]);
    },

    // data is NxD array. Returns array of 1 or -1, predictions
    predict: function (data) {
      var margs = this.margins(data);
      for (var i = 0; i < margs.length; i++) {
        margs[i] = margs[i] > 0 ? 1 : -1;
      }
      return margs;
    },

    // THIS FUNCTION IS NOW DEPRECATED. WORKS FINE BUT NO NEED TO USE ANYMORE. 
    // LEAVING IT HERE JUST FOR BACKWARDS COMPATIBILITY FOR A WHILE.
    // if we trained a linear svm, it is possible to calculate just the weights and the offset
    // prediction is then yhat = sign(X * w + b)
    getWeights: function () {

      // DEPRECATED
      var w = new Array(this.D);
      for (var j = 0; j < this.D; j++) {
        var s = 0.0;
        for (var i = 0; i < this.N; i++) {
          s += this.alpha[i] * this.labels[i] * this.data[i][j];
        }
        w[j] = s;
      }
      return { w: w, b: this.b };
    },

    toJSON: function () {

      if (this.kernelType === "custom") {
        console.log("Can't save this SVM because it's using custom, unsupported kernel...");
        return {};
      }

      json = {}
      json.N = this.N;
      json.D = this.D;
      json.b = this.b;

      json.kernelType = this.kernelType;
      if (this.kernelType === "linear") {
        // just back up the weights
        json.w = this.w;
      }
      if (this.kernelType === "rbf") {
        // we need to store the support vectors and the sigma
        json.rbfSigma = this.rbfSigma;
        json.data = this.data;
        json.labels = this.labels;
        json.alpha = this.alpha;
      }

      return json;
    },

    fromJSON: function (json) {

      this.N = json.N;
      this.D = json.D;
      this.b = json.b;

      this.kernelType = json.kernelType;
      if (this.kernelType === "linear") {

        // load the weights! 
        this.w = json.w;
        this.usew_ = true;
        this.kernel = linearKernel; // this shouldn't be necessary
      }
      else if (this.kernelType == "rbf") {

        // initialize the kernel
        this.rbfSigma = json.rbfSigma;
        this.kernel = makeRbfKernel(this.rbfSigma);

        // load the support vectors
        this.data = json.data;
        this.labels = json.labels;
        this.alpha = json.alpha;
      } else {
        console.log("ERROR! unrecognized kernel type." + this.kernelType);
      }
    }
  }

  // Kernels
  function makeRbfKernel(sigma) {
    return function (v1, v2) {
      var s = 0;
      for (var q = 0; q < v1.length; q++) { s += (v1[q] - v2[q]) * (v1[q] - v2[q]); }
      return Math.exp(-s / (2.0 * sigma * sigma));
    }
  }

  function linearKernel(v1, v2) {
    var s = 0;
    for (var q = 0; q < v1.length; q++) { s += v1[q] * v2[q]; }
    return s;
  }

  // Misc utility functions
  // generate random floating point number between a and b
  function randf(a, b) {
    return Math.random() * (b - a) + a;
  }

  // generate random integer between a and b (b excluded)
  function randi(a, b) {
    return Math.floor(Math.random() * (b - a) + a);
  }

  // create vector of zeros of length n
  function zeros(n) {
    var arr = new Array(n);
    for (var i = 0; i < n; i++) { arr[i] = 0; }
    return arr;
  }

  // export public members
  exports = exports || {};
  exports.SVM = SVM;
  exports.makeRbfKernel = makeRbfKernel;
  exports.linearKernel = linearKernel;
  return exports;

})(typeof module != 'undefined' && module.exports);  // add exports to module.exports if in node.js

var N = 10; //number of data points
var data = new Array(N);
var labels = new Array(N);
var wb; // weights and offset structure
var ss = 50.0; // scaling factor for drawing
var svm = new svmjs.SVM();
var trainstats;
var dirty = true;
var kernelid = 1;
var rbfKernelSigma = 0.5;
var svmC = 1.0;


function myinit() {

  data[0] = [-0.4326, 1.1909];
  data[1] = [3.0, 4.0];
  data[2] = [0.1253, -0.0376];
  data[3] = [0.2877, 0.3273];
  data[4] = [-1.1465, 0.1746];
  data[5] = [1.8133, 2.1139];
  data[6] = [2.7258, 3.0668];
  data[7] = [1.4117, 2.0593];
  data[8] = [4.1832, 1.9044];
  data[9] = [1.8636, 1.1677];
  labels[0] = 1;
  labels[1] = 1;
  labels[2] = 1;
  labels[3] = 1;
  labels[4] = 1;
  labels[5] = -1;
  labels[6] = -1;
  labels[7] = -1;
  labels[8] = -1;
  labels[9] = -1;

  retrainSVM();
}

function retrainSVM() {

  if (kernelid === 1) {
    trainstats = svm.train(data, labels, { kernel: 'rbf', rbfsigma: rbfKernelSigma, C: svmC });
  }
  if (kernelid === 0) {
    trainstats = svm.train(data, labels, { kernel: 'linear', C: svmC });
    wb = svm.getWeights();
  }

  dirty = true; // to redraw screen
}

function update() {
}

function draw() {
  if (!dirty) return;

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // draw decisions in the grid
  var density = 4.0;
  for (var x = 0.0; x <= WIDTH; x += density) {
    for (var y = 0.0; y <= HEIGHT; y += density) {
      var dec = svm.marginOne([(x - WIDTH / 2) / ss, (y - HEIGHT / 2) / ss]);
      if (dec > 0) ctx.fillStyle = 'rgb(0, 198, 163)';
      else ctx.fillStyle = 'rgb(250,150,150)';
      ctx.fillRect(x - density / 2 - 1, y - density - 1, density + 2, density + 2);
    }
  }

  // draw axes
  ctx.beginPath();
  ctx.strokeStyle = 'rgb(50,50,50)';
  ctx.lineWidth = 1;
  ctx.moveTo(0, HEIGHT / 2);
  ctx.lineTo(WIDTH, HEIGHT / 2);
  ctx.moveTo(WIDTH / 2, 0);
  ctx.lineTo(WIDTH / 2, HEIGHT);
  ctx.stroke();

  // draw datapoints. Draw support vectors larger
  ctx.strokeStyle = 'rgb(0,0,0)';
  for (var i = 0; i < N; i++) {

    if (labels[i] == 1) ctx.fillStyle = 'rgb(100,200,100)';
    else ctx.fillStyle = 'rgb(200,100,100)';

    if (svm.alpha[i] > 1e-2) ctx.lineWidth = 3; // distinguish support vectors
    else ctx.lineWidth = 1;

    drawCircle(data[i][0] * ss + WIDTH / 2, data[i][1] * ss + HEIGHT / 2, Math.floor(3 + svm.alpha[i] * 5.0 / svmC));
  }

  // if linear kernel, draw decision boundary and margin lines
  if (kernelid == 0) {

    var xs = [-5, 5];
    var ys = [0, 0];
    ys[0] = (-wb.b - wb.w[0] * xs[0]) / wb.w[1];
    ys[1] = (-wb.b - wb.w[0] * xs[1]) / wb.w[1];
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    // wx+b=0 line
    ctx.moveTo(xs[0] * ss + WIDTH / 2, ys[0] * ss + HEIGHT / 2);
    ctx.lineTo(xs[1] * ss + WIDTH / 2, ys[1] * ss + HEIGHT / 2);
    // wx+b=1 line
    ctx.moveTo(xs[0] * ss + WIDTH / 2, (ys[0] - 1.0 / wb.w[1]) * ss + HEIGHT / 2);
    ctx.lineTo(xs[1] * ss + WIDTH / 2, (ys[1] - 1.0 / wb.w[1]) * ss + HEIGHT / 2);
    // wx+b=-1 line
    ctx.moveTo(xs[0] * ss + WIDTH / 2, (ys[0] + 1.0 / wb.w[1]) * ss + HEIGHT / 2);
    ctx.lineTo(xs[1] * ss + WIDTH / 2, (ys[1] + 1.0 / wb.w[1]) * ss + HEIGHT / 2);
    ctx.stroke();

    // draw margin lines for support vectors. The sum of the lengths of these
    // lines, scaled by C is essentially the total hinge loss.
    for (var i = 0; i < N; i++) {
      if (svm.alpha[i] < 1e-2) continue;
      if (labels[i] == 1) {
        ys[0] = (1 - wb.b - wb.w[0] * xs[0]) / wb.w[1];
        ys[1] = (1 - wb.b - wb.w[0] * xs[1]) / wb.w[1];
      } else {
        ys[0] = (-1 - wb.b - wb.w[0] * xs[0]) / wb.w[1];
        ys[1] = (-1 - wb.b - wb.w[0] * xs[1]) / wb.w[1];
      }
      var u = (data[i][0] - xs[0]) * (xs[1] - xs[0]) + (data[i][1] - ys[0]) * (ys[1] - ys[0]);
      u = u / ((xs[0] - xs[1]) * (xs[0] - xs[1]) + (ys[0] - ys[1]) * (ys[0] - ys[1]));
      var xi = xs[0] + u * (xs[1] - xs[0]);
      var yi = ys[0] + u * (ys[1] - ys[0]);
      ctx.moveTo(data[i][0] * ss + WIDTH / 2, data[i][1] * ss + HEIGHT / 2);
      ctx.lineTo(xi * ss + WIDTH / 2, yi * ss + HEIGHT / 2);
    }
    ctx.stroke();
  }

  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillText("Converged in " + trainstats.iters + " iterations.", 10, HEIGHT - 30);
  var numsupp = 0;
  for (var i = 0; i < N; i++) { if (svm.alpha[i] > 1e-5) numsupp++; }
  ctx.fillText("Number of support vectors: " + numsupp + " / " + N, 10, HEIGHT - 50);

  if (kernelid === 1) ctx.fillText("Using Rbf kernel with sigma = " + rbfKernelSigma.toPrecision(2), 10, HEIGHT - 70);
  if (kernelid === 0) ctx.fillText("Using Linear kernel", 10, HEIGHT - 70);

  ctx.fillText("C = " + svmC.toPrecision(2), 10, HEIGHT - 90);
}

function mouseClick(x, y, shiftPressed) {

  // add datapoint at location of click
  data[N] = [(x - WIDTH / 2) / ss, (y - HEIGHT / 2) / ss];
  labels[N] = shiftPressed ? 1 : -1;
  N += 1;

  // retrain the svm
  retrainSVM();
}
function keyUp(key) {

  if (key == 82) { // 'r'

    // reset to original data and retrain
    data = data.splice(0, 10);
    labels = labels.splice(0, 10);
    N = 10;
    retrainSVM();
  }
  if (key == 75) { // 'k'

    // toggle between kernels: rbf or linear
    kernelid = 1 - kernelid; // toggle 1 and 0
    retrainSVM();
  }
}
function keyDown(key) {
}


// UI stuff
function refreshC(event, ui) {
  var logC = event;
  svmC = logC;
  $("#creport").text("C = " + svmC.toPrecision(2));
  retrainSVM();
}

function refreshSig(event, ui) {
  var logSig = ui.value;
  rbfKernelSigma = Math.pow(10, logSig);
  $("#sigreport").text("RBF Kernel sigma = " + rbfKernelSigma.toPrecision(2));
  if (kernelid == 1) {
    retrainSVM();
  }
}

$(function () {
  // for C parameter
  $("#slider1").slider({
    orientation: "horizontal",
    slide: refreshC,
    max: 2.0,
    min: -2.0,
    step: 0.1,
    value: 0.0
  });

  // for rbf kernel sigma
  $("#slider2").slider({
    orientation: "horizontal",
    slide: refreshSig,
    max: 2.0,
    min: -2.0,
    step: 0.1,
    value: 0.0
  });
});
var canvas;
var ctx;
var WIDTH;
var HEIGHT;
var FPS;

function drawBubble(x, y, w, h, radius) {
  var r = x + w;
  var b = y + h;
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineWidth = "2";
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + radius / 2, y - 10);
  ctx.lineTo(x + radius * 2, y);
  ctx.lineTo(r - radius, y);
  ctx.quadraticCurveTo(r, y, r, y + radius);
  ctx.lineTo(r, y + h - radius);
  ctx.quadraticCurveTo(r, b, r - radius, b);
  ctx.lineTo(x + radius, b);
  ctx.quadraticCurveTo(x, b, x, b - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.stroke();
}

function drawRect(x, y, w, h) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function drawCircle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

//uniform distribution integer
function randi(s, e) {
  return Math.floor(Math.random() * (e - s) + s);
}

//uniform distribution
function randf(s, e) {
  return Math.random() * (e - s) + s;
}

//normal distribution random number
function randn(mean, variance) {
  var V1, V2, S;
  do {
    var U1 = Math.random();
    var U2 = Math.random();
    V1 = 2 * U1 - 1;
    V2 = 2 * U2 - 1;
    S = V1 * V1 + V2 * V2;
  } while (S > 1);
  X = Math.sqrt(-2 * Math.log(S) / S) * V1;
  X = mean + Math.sqrt(variance) * X;
  return X;
}

function eventClick(e) {

  //get position of cursor relative to top left of canvas
  var x;
  var y;
  if (e.pageX || e.pageY) {
    x = e.pageX;
    y = e.pageY;
  } else {
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  //call user-defined callback
  mouseClick(x, y, e.shiftKey);
}

//event codes can be found here:
//http://www.aspdotnetfaq.com/Faq/What-is-the-list-of-KeyCodes-for-JavaScript-KeyDown-KeyPress-and-KeyUp-events.aspx
function eventKeyUp(e) {
  var keycode = ('which' in e) ? e.which : e.keyCode;
  keyUp(keycode);
}

function eventKeyDown(e) {
  var keycode = ('which' in e) ? e.which : e.keyCode;
  keyDown(keycode);
}

function NPGinit(FPS) {
  //takes frames per secont to run at

  canvas = document.getElementById('NPGcanvas');
  ctx = canvas.getContext('2d');
  WIDTH = canvas.width;
  HEIGHT = canvas.height;
  canvas.addEventListener('click', eventClick, false);

  //canvas element cannot get focus by default. Requires to either set 
  //tabindex to 1 so that it's focusable, or we need to attach listeners
  //to the document. Here we do the latter
  document.addEventListener('keyup', eventKeyUp, true);
  document.addEventListener('keydown', eventKeyDown, true);

  setInterval(NPGtick, 1000 / FPS);

  myinit();
}

function NPGtick() {
  update();
  draw();
}

