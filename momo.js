var Momo = new class {

  constructor() {

    // Everything is drawn on this canvas.
    this.canvas = undefined;

    // Resources are queued here.
    this.resources = [];

    // This dictates how often the canvas should be updated.
    this.frame_rate = undefined;

    // These dictate how text should be aligned when drawn.
    this.TEXT_ALIGN_LEFT = 0;
    this.TEXT_ALIGN_RIGHT = 1;
    this.TEXT_ALIGN_CENTER = 2;

    // These store information pertaining to mouse axes.
    this.mouse_x = 0;
    this.mouse_y = 0;
    this.mouse_z = 0;

    // These store information pertaining to mouse buttons.
    this.mouse_button = [];
    this.mouse_button_pressed = [];
    this.mouse_button_released = [];

    // These define mouse buttons.
    this.MOUSE_BUTTON_LEFT = 0;
    this.MOUSE_BUTTON_RIGHT = 2;
    this.MOUSE_BUTTON_MIDDLE = 1;

    // The time in which the library was initialized is stored here.
    this.time_initialized = undefined;
  }

  initialize() {

    let canvas = document.createElement("canvas");

    if (!!!(canvas && canvas.getContext("2d"))) {

      // The browser does not support the canvas element.
      return false;
    }

    // Set the time in which the library was initialized.
    this.time_initialized = Date.now();

    return true;
  }

  getTime() {

    // Get the number of seconds elapsed since the library was initialized.
    return ((Date.now() - this.time_initialized) / 1000).toFixed(6);
  }

  manageMouseEvents(event) {

    switch (event.type) {

      case "wheel":

        this.mouse_z = event.deltaY;
      break;

      case "mouseup":

        this.mouse_button[event.button] = false;
        this.mouse_button_released[event.button] = true;
      break;

      case "mousedown":

        if (!this.mouse_button[event.button]) {

          this.mouse_button_pressed[event.button] = true;
        }

        this.mouse_button[event.button] = true;
      break;

      case "mousemove":

        this.mouse_x = event.offsetX;
        this.mouse_y = event.offsetY;
      break;
    }

    event.preventDefault();
  }

  isMouseButtonUp(button) {

    return !this.mouse_button[button];
  }

  isMouseButtonDown(button) {

    return this.mouse_button[button];
  }

  isMouseButtonPressed(button) {

    return this.mouse_button_pressed[button];
  }

  isMouseButtonReleased(button) {

    return this.mouse_button_released[button];
  }

  getMouseX() {

    return this.mouse_x;
  }

  getMouseY() {

    return this.mouse_y;
  }

  getMouseZ() {

    return this.mouse_z;
  }

  hideMouseCursor() {

    this.canvas.canvas.style.cursor = "none";
  }

  showMouseCursor() {

    this.canvas.canvas.style.cursor = "auto";
  }

  isMouseCursorHidden() {

    return (this.canvas.canvas.style.cursor == "none" ? true : false);
  }

  manageKeyboardEvents(event) {

    switch (event.type) {

      case "keyup":

        this.key[event.which] = false;
        this.key_released[event.which] = true;
      break;

      case "keydown":

        if (!this.key[event.which]) {

          this.key_pressed[event.which] = true;
        }

        this.key[event.which] = true;
      break;
    }

    event.preventDefault();
  }

  installKeyboard() {

    // These store which keys are pressed and released.
    this.key = [];
    this.key_pressed = [];
    this.key_released = [];

    // Define key codes.
    this.key_codes = {

      "backspace": 8,

      "tab": 9,

      "enter": 13,

      "shift": 16,

      "ctrl": 17,

      "alt": 18,

      "pausebreak": 19,

      "capslock": 20,

      "escape": 27,

      "space": 32,

      "pageup": 33,

      "pagedown": 34,

      "end": 35,

      "home": 36,

      "left": 37,

      "up": 38,

      "right": 39,

      "down": 40,

      "insert": 45,

      "delete": 46,

      "0": 48,

      "1": 49,

      "2": 50,

      "3": 51,

      "4": 52,

      "5": 53,

      "6": 54,

      "7": 55,

      "8": 56,

      "9": 57,

      "a": 65,

      "b": 66,

      "c": 67,

      "d": 68,

      "e": 69,

      "f": 70,

      "g": 71,

      "h": 72,

      "i": 73,

      "j": 74,

      "k": 75,

      "l": 76,

      "m": 77,

      "n": 78,

      "o": 79,

      "p": 80,

      "q": 81,

      "r": 82,

      "s": 83,

      "t": 84,

      "u": 85,

      "v": 86,

      "w": 87,

      "x": 88,

      "y": 89,

      "z": 90,

      "lmeta": 91,

      "rmeta": 92,

      "select": 93,

      "pad_0": 96,

      "pad_1": 97,

      "pad_2": 98,

      "pad_3": 99,

      "pad_4": 100,

      "pad_5": 101,

      "pad_6": 102,

      "pad_7": 103,

      "pad_8": 104,

      "pad_9": 105,

      "multiply": 106,

      "add": 107,

      "subtract": 109,

      "divide": 111,

      "f1": 112,

      "f2": 113,

      "f3": 114,

      "f4": 115,

      "f5": 116,

      "f6": 117,

      "f7": 118,

      "f8": 119,

      "f9": 120,

      "f10": 121,

      "f11": 122,

      "f12": 123,

      "numlock": 144,

      "scrolllock": 145,

      "semicolon": 186,

      "equals": 187,

      "comma": 188,

      "dash": 189,

      "period": 190,

      "forwardslash": 191,

      "tilde": 192,

      "openbrace": 219,

      "backslash": 220,

      "closebrace": 221,

      "quote": 222
    };

    this.keyboard_method = this.manageKeyboardEvents.bind(this);

    // Listen for keyboard events.
    document.addEventListener("keyup", this.keyboard_method);
    document.addEventListener("keydown", this.keyboard_method);
  }

  uninstallKeyboard() {

    // Stop listening for keyboard events.
    document.removeEventListener("keyup", this.keyboard_method);
    document.removeEventListener("keydown", this.keyboard_method);
  }

  isKeyUp(key_code) {

    return !this.key[this.key_codes["" + key_code]];
  }

  isKeyDown(key_code) {

    return this.key[this.key_codes["" + key_code]];
  }

  isKeyPressed(key_code) {

    return this.key_pressed[this.key_codes["" + key_code]];
  }

  isKeyReleased(key_code) {

    return this.key_released[this.key_codes["" + key_code]];
  }

  setCanvas(canvas_id, canvas_width, canvas_height) {

    // Get the specified canvas element.
    let canvas = document.getElementById(canvas_id);

    if (!!!canvas) {

      // The specified canvas element does not exist.
      return false;
    }

    // Listen for mouse events.
    canvas.addEventListener("wheel", this.manageMouseEvents.bind(this));
    canvas.addEventListener("mouseup", this.manageMouseEvents.bind(this));
    canvas.addEventListener("mousedown", this.manageMouseEvents.bind(this));
    canvas.addEventListener("mousemove", this.manageMouseEvents.bind(this));
    canvas.addEventListener("contextmenu", this.manageMouseEvents.bind(this));

    // Set the dimensions of the canvas.
    canvas.width = canvas_width;
    canvas.height = canvas_height;

    // Set the dimensions, elements, and contexts of the member canvas.
    this.canvas = {

      width: canvas_width,

      height: canvas_height,

      canvas: canvas,

      context: canvas.getContext("2d"),

      ready: true
    };

    return true;
  }

  clearCanvas(color) {

    this.setStrokeAndFillStyle(color);

    this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getCanvasWidth() {

    return this.canvas.width;
  }

  getCanvasHeight() {

    return this.canvas.height;
  }

  setFrameRate(frame_rate) {

    this.frame_rate = frame_rate;
  }

  getFrameRate() {

    return this.frame_rate;
  }

  resourcesLoaded(procedure) {

    let number_of_resources = 0;
    let number_of_resources_loaded = 0;

    for (let i = 0; i < this.resources.length; ++i) {

      ++number_of_resources;

      if (this.resources[i].type == "sound") {

        // Check if sound files have completed loading.

        if (this.resources[i].element.readyState >= this.resources[i].element.HAVE_FUTURE_DATA) {

          // The sound files have loaded enough to begin being played.
          this.resources[i].ready = true;
        }
      }

      if (this.resources[i].ready) {

        ++number_of_resources_loaded;
      }
    }

    if (number_of_resources_loaded < number_of_resources) {

      // Some resources have not completed downloading yet.
      window.setTimeout(this.resourcesLoaded.bind(this), 100, procedure);
    }
    else {

      // All of the resources have completed downloading.
      procedure();
    }
  }

  createLoop(procedure) {

    window.setInterval(

      function() {

        procedure();

        // Reset mouse wheel position.
        this.mouse_z = 0;

        for (let i = 0; i < this.mouse_button.length; ++i) {

          // Clear mouse button arrays so each mouse button event fires only once.
          this.mouse_button_pressed[i] = false;
          this.mouse_button_released[i] = false;
        }

        for (let i = 0; i < this.key.length; ++i) {

          // Clear key arrays so each keyboard event fires only once.
          this.key_pressed[i] = false;
          this.key_released[i] = false;
        }
      }.bind(this),

      1000 / this.frame_rate
    );
  }

  makeColor(r, g, b, a = 255) {

    return {r: r, g: g, b: b, a: a};
  }

  setStrokeAndFillStyle(color, line_width = 0) {

    let r = color.r;
    let g = color.g;
    let b = color.b;
    let a = color.a / 255.0;

    this.canvas.context.lineWidth = line_width;
    this.canvas.context.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    this.canvas.context.strokeStyle = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
  }

  setEntryPoint(function_name) {

    // Call the specified function when the window loads.
    window.addEventListener("load", function_name);
  }

  loadFont(file_name) {

    let element = document.createElement("style");

    let font_name = "font_" + Math.random().toString(16).slice(2);

    element.textContent = `

      @font-face {

        font-family: ` + font_name + `;
        src: url("` + file_name + `");
      }
    `;

    document.head.appendChild(element);

    let font = {

      element: element,

      file: file_name,

      name: font_name,

      type: "font"
    };

    // Pre-load font.
    this.drawText(font, this.makeColor(0, 0, 0, 0), 0, 0, 0, this.TEXT_ALIGN_LEFT, "");

    return font;
  }

  drawText(font, fill_color, size, x, y, alignment, text, outline_color = undefined, outline_width = 0) {

    switch (alignment) {

      case this.TEXT_ALIGN_LEFT:

        this.canvas.context.textAlign = "left";
      break;

      case this.TEXT_ALIGN_CENTER:

        this.canvas.context.textAlign = "center";
      break;

      case this.TEXT_ALIGN_RIGHT:

        this.canvas.context.textAlign = "right";
      break;
    }

    this.canvas.context.font = size + "px " + font.name;

    this.setStrokeAndFillStyle(fill_color);

    this.canvas.context.fillText(text, x, y + size);

    if (outline_color != undefined && outline_width > 0) {

      this.setStrokeAndFillStyle(outline_color, outline_width);

      this.canvas.context.strokeText(text, x, y + size);
    }
  }

  loadSound(file_name) {

    let element = document.createElement("audio");

    if (!!!element.canPlayType("audio/" + file_name.split(".").pop())) {

      // The browser can not play this audio format.
      return false;
    }

    element.src = file_name;

    let sound = {

      element: element,

      file: file_name,

      volume: 1.0,

      ready: false,

      type: "sound"
    };

    this.resources.push(sound);

    element.onloadeddata = function() {

      if (!sound.ready) {

        sound.ready = true;
      }
    };

    return sound;
  }

  playSound(sound, volume, speed, loop) {

    if (!loop & this.isSoundPlaying(sound)) {

      sound.element.load();
    }

    sound.volume = volume;

    sound.element.loop = loop;
    sound.element.volume = volume;
    sound.element.playbackRate = speed;

    sound.element.play();
  }

  stopSound(sound) {

    sound.element.pause();

    sound.element.currentTime = 0;
  }

  pauseSound(sound) {

    sound.element.pause();
  }

  resumeSound(sound) {

    sound.element.play();
  }

  isSoundPaused(sound) {

    return sound.element.paused;
  }

  isSoundPlaying(sound) {

    return !sound.element.paused;
  }

  loadImage(file_name) {

    let element = new Image();

    element.src = file_name;

    let sub_canvas = document.createElement("canvas");
    let sub_canvas_context = sub_canvas.getContext("2d");

    let image = {

      canvas: sub_canvas,

      context: sub_canvas_context,

      width: -1,

      height: -1,

      ready: false,

      type: "image"
    };

    this.resources.push(image);

    element.onload = function() {

      image.canvas.width = element.width;
      image.canvas.height = element.height;

      image.context.drawImage(element, 0, 0);

      image.width = element.width;
      image.height = element.height;

      image.ready = true;
    }

    return image;
  }

  getImageWidth(image) {

    return image.width;
  }

  getImageHeight(image) {

    return image.height;
  }

  drawImage(image, x, y) {

    this.canvas.context.drawImage(image.canvas, x, y);
  }

  drawScaledImage(image, x, y, scale_width, scale_height) {

    this.canvas.context.save();

    this.canvas.context.translate(x, y);
    this.canvas.context.scale(scale_width, scale_height);

    this.drawImage(image, 0, 0);

    this.canvas.context.restore();
  }

  drawPartialImage(image, start_x, start_y, width, height, x, y) {

    this.canvas.context.save();

    this.canvas.context.drawImage(image.canvas, start_x, start_y, width, height, x, y, width, height);

    this.canvas.context.restore();
  }

  drawRotatedImage(image, center_x, center_y, draw_x, draw_y, angle) {

    this.canvas.context.save();

    this.canvas.context.translate(draw_x + center_x, draw_y + center_y);
    this.canvas.context.rotate(angle);

    this.drawImage(image, -center_x, -center_y);

    this.canvas.context.restore();
  }

  drawPolygon(points, color, thickness, join) {

    this.setStrokeAndFillStyle(color, thickness);

    let x = [];
    let y = [];

    for (let i = 0; i < points.length; ++i) {

      if (i % 2) {

        y.push(points[i]);
      }
      else {

        x.push(points[i]);
      }
    }

    this.canvas.context.beginPath();

    for (let i = 0; i < x.length; ++i) {

      if (i == 0) {

        this.canvas.context.moveTo(x[i], y[i]);

        continue;
      }

      this.canvas.context.lineTo(x[i], y[i]);
    }

    if (join) {

      this.canvas.context.closePath();
    }

    this.canvas.context.stroke();
  }

  drawFilledPolygon(points, color) {

    this.setStrokeAndFillStyle(color);

    let x = [];
    let y = [];

    for (let i = 0; i < points.length; ++i) {

      if (i % 2) {

        y.push(points[i]);
      }
      else {

        x.push(points[i]);
      }
    }

    this.canvas.context.beginPath();

    for (let i = 0; i < x.length; ++i) {

      if (i == 0) {

        this.canvas.context.moveTo(x[i], y[i]);

        continue;
      }

      this.canvas.context.lineTo(x[i], y[i]);
    }

    this.canvas.context.closePath();

    this.canvas.context.fill();
  }

  drawLine(begin_x, begin_y, end_x, end_y, color, thickness) {

    this.setStrokeAndFillStyle(color, thickness);

    this.canvas.context.beginPath();
    this.canvas.context.moveTo(begin_x, begin_y);
    this.canvas.context.lineTo(end_x, end_y);
    this.canvas.context.closePath();
    this.canvas.context.stroke();
  }

  drawPixel(x, y, color) {

    this.drawFilledRectangle(x, y, x + 1, y + 1, color);
  }

  drawArc(center_x, center_y, radius, start_angle, end_angle, color, thickness) {

    this.setStrokeAndFillStyle(color, thickness);

    this.canvas.context.beginPath();
    this.canvas.context.arc(center_x, center_y, radius, start_angle, end_angle);
    this.canvas.context.closePath();
    this.canvas.context.stroke();
  }

  drawFilledArc(center_x, center_y, radius, start_angle, end_angle, color) {

    this.setStrokeAndFillStyle(color);

    this.canvas.context.beginPath();
    this.canvas.context.arc(center_x, center_y, radius, start_angle, end_angle);
    this.canvas.context.closePath();
    this.canvas.context.fill();
  }

  drawCircle(center_x, center_y, radius, color, thickness) {

    this.drawArc(center_x, center_y, radius, 0, 2 * Math.PI, color, thickness);
  }

  drawFilledCircle(center_x, center_y, radius, color) {

    this.drawFilledArc(center_x, center_y, radius, 0, 2 * Math.PI, color);
  }

  drawEllipse(center_x, center_y, radius_x, radius_y, color, thickness) {

    this.setStrokeAndFillStyle(color, thickness);

    this.canvas.context.beginPath();
    this.canvas.context.ellipse(center_x, center_y, radius_x, radius_y, 0, 0, 2 * Math.PI);
    this.canvas.context.closePath();
    this.canvas.context.stroke();
  }

  drawFilledEllipse(center_x, center_y, radius_x, radius_y, color) {

    this.setStrokeAndFillStyle(color);

    this.canvas.context.beginPath();
    this.canvas.context.ellipse(center_x, center_y, radius_x, radius_y, 0, 0, 2 * Math.PI);
    this.canvas.context.closePath();
    this.canvas.context.fill();
  }

  drawRectangle(begin_x, begin_y, end_x, end_y, color, thickness) {

    this.setStrokeAndFillStyle(color, thickness);

    this.canvas.context.beginPath();
    this.canvas.context.rect(begin_x, begin_y, end_x - begin_x, end_y - begin_y);
    this.canvas.context.closePath();
    this.canvas.context.stroke();
  }

  drawFilledRectangle(begin_x, begin_y, end_x, end_y, color) {

    this.setStrokeAndFillStyle(color);

    this.canvas.context.beginPath();
    this.canvas.context.rect(begin_x, begin_y, end_x - begin_x, end_y - begin_y);
    this.canvas.context.closePath();
    this.canvas.context.fill();
  }

  drawTriangle(x1, y1, x2, y2, x3, y3, color, thickness) {

    this.setStrokeAndFillStyle(color, thickness);

    this.canvas.context.beginPath();
    this.canvas.context.moveTo(x1, y1);
    this.canvas.context.lineTo(x2, y2);
    this.canvas.context.lineTo(x3, y3);
    this.canvas.context.closePath();
    this.canvas.context.stroke();
  }

  drawFilledTriangle(x1, y1, x2, y2, x3, y3, color) {

    this.setStrokeAndFillStyle(color);

    this.canvas.context.beginPath();
    this.canvas.context.moveTo(x1, y1);
    this.canvas.context.lineTo(x2, y2);
    this.canvas.context.lineTo(x3, y3);
    this.canvas.context.closePath();
    this.canvas.context.fill();
  }
}
