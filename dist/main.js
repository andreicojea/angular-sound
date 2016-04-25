/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/webaudio.d.ts" />
var AngularSound;
(function (AngularSound) {
    var Sound = (function () {
        function Sound(name, buffer) {
            this.name = name;
            this.buffer = buffer;
        }
        return Sound;
    }());
    var SoundService = (function () {
        // @ngInject
        SoundService.$inject = ["$window", "$http", "$q"];
        function SoundService($window, $http, $q) {
            this.$window = $window;
            this.$http = $http;
            this.$q = $q;
            this.sounds = [];
        }
        SoundService.prototype.initialize = function () {
            if (!!!this.context) {
                if (this.$window.AudioContext)
                    this.context = new this.$window.AudioContext();
                else if (this.$window.webkitAudioContext)
                    this.context = new this.$window.webkitAudioContext();
                else
                    throw 'browser does not support the web audio api';
            }
        };
        SoundService.prototype.loadSound = function (soundInfo) {
            var _this = this;
            this.initialize(); // lazy init
            var deferred = this.$q.defer();
            this.$http.get(soundInfo.src, { responseType: 'arraybuffer' })
                .then(function (response) {
                _this.context.decodeAudioData(response.data, function (audioBuffer) {
                    if (audioBuffer.duration > 50)
                        throw soundInfo.name + ' is too long, this module is designed to handle sounds less than 50s long';
                    var sound = new Sound(soundInfo.name, audioBuffer);
                    _this.sounds.push(sound);
                    deferred.resolve(_this.getBufferSource(sound));
                });
            }, function (reason) { throw reason; });
            return deferred.promise;
        };
        SoundService.prototype.getSound = function (name) {
            this.initialize(); // lazy init
            for (var i in this.sounds) {
                if (this.sounds[i].name === name) {
                    return this.getBufferSource(this.sounds[i]);
                }
            }
            throw 'no loaded sound called "' + name + '"';
        };
        SoundService.prototype.getBufferSource = function (sound) {
            var bufferSource;
            bufferSource = this.context.createBufferSource();
            bufferSource.buffer = sound.buffer;
            bufferSource.connect(this.context.destination);
            return bufferSource;
        };
        return SoundService;
    }());
    AngularSound.SoundService = SoundService;
})(AngularSound || (AngularSound = {}));
angular
    .module('mcwebb.sound', [])
    .service('SoundService', AngularSound.SoundService);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4udHMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLElBQU87QUFBUCxDQUFBLFVBQU8sY0FBYTtJQVduQixJQUFBLFNBQUEsWUFBQTtRQUlDLFNBQUEsTUFBWSxNQUFjLFFBQW1CO1lBQzVDLEtBQUssT0FBTztZQUNaLEtBQUssU0FBUzs7UUFFaEIsT0FBQTs7SUFFQSxJQUFBLGdCQUFBLFlBQUE7OztRQU9DLFNBQUEsYUFBWSxTQUFnQyxPQUF3QixJQUFnQjtZQUNuRixLQUFLLFVBQVU7WUFDZixLQUFLLFFBQVE7WUFDYixLQUFLLEtBQUs7WUFDVixLQUFLLFNBQVM7O1FBR2YsYUFBQSxVQUFBLGFBQUEsWUFBQTtZQUNDLElBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFRO2dCQUNsQixJQUFJLEtBQUssUUFBUTtvQkFDaEIsS0FBSyxVQUFVLElBQUksS0FBSyxRQUFRO3FCQUM1QixJQUFJLEtBQUssUUFBUTtvQkFDckIsS0FBSyxVQUFVLElBQUksS0FBSyxRQUFROztvQkFDNUIsTUFBTTs7O1FBSWIsYUFBQSxVQUFBLFlBQUEsVUFBVSxXQUEyQjtZQUFyQyxJQUFBLFFBQUE7WUFDQyxLQUFLO1lBRUwsSUFBSSxXQUFXLEtBQUssR0FBRztZQUV2QixLQUFLLE1BQU0sSUFBSSxVQUFVLEtBQUssRUFBRSxjQUFjO2lCQUM1QyxLQUFLLFVBQUMsVUFBaUQ7Z0JBQ3ZELE1BQUssUUFBUSxnQkFBZ0IsU0FBUyxNQUFNLFVBQUMsYUFBd0I7b0JBQ3BFLElBQUksWUFBWSxXQUFXO3dCQUMxQixNQUFNLFVBQVUsT0FBTztvQkFFeEIsSUFBSSxRQUFRLElBQUksTUFBTSxVQUFVLE1BQU07b0JBQ3RDLE1BQUssT0FBTyxLQUFLO29CQUVqQixTQUFTLFFBQVEsTUFBSyxnQkFBZ0I7O2VBRXJDLFVBQUMsUUFBTSxFQUFPLE1BQU07WUFFeEIsT0FBTyxTQUFTOztRQUdqQixhQUFBLFVBQUEsV0FBQSxVQUFTLE1BQVk7WUFDcEIsS0FBSztZQUVMLEtBQUssSUFBSSxLQUFLLEtBQUssUUFBUTtnQkFDMUIsSUFBSSxLQUFLLE9BQU8sR0FBRyxTQUFTLE1BQU07b0JBQ2pDLE9BQU8sS0FBSyxnQkFBZ0IsS0FBSyxPQUFPOzs7WUFJMUMsTUFBTSw2QkFBNkIsT0FBTzs7UUFHbkMsYUFBQSxVQUFBLGtCQUFSLFVBQXdCLE9BQVk7WUFDbkMsSUFBSTtZQUNKLGVBQWUsS0FBSyxRQUFRO1lBQzVCLGFBQWEsU0FBUyxNQUFNO1lBQzVCLGFBQWEsUUFBUSxLQUFLLFFBQVE7WUFFbEMsT0FBTzs7UUFFVCxPQUFBOztJQWpFYSxhQUFBLGVBQVk7R0FyQm5CLGlCQUFBLGVBQVk7QUF5Rm5CO0tBQ0UsT0FBTyxnQkFBZ0I7S0FDdkIsUUFBUSxnQkFBZ0IsYUFBYTtBQ3pCdkMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL3dlYmF1ZGlvLmQudHNcIiAvPlxubW9kdWxlIEFuZ3VsYXJTb3VuZCB7XG5cdGludGVyZmFjZSBXZWJBdWRpb0VuYWJsZWRXaW5kb3cgZXh0ZW5kcyBuZy5JV2luZG93U2VydmljZSB7XG5cdFx0QXVkaW9Db250ZXh0OiB7IG5ldyAoKTogQXVkaW9Db250ZXh0IH07XG5cdFx0d2Via2l0QXVkaW9Db250ZXh0OiB7IG5ldyAoKTogQXVkaW9Db250ZXh0IH07XG5cdH1cblxuXHRpbnRlcmZhY2UgU291bmRJbmZvcm1hdGlvbiB7XG5cdFx0bmFtZTogc3RyaW5nO1xuXHRcdHNyYzogc3RyaW5nO1xuXHR9XG5cblx0Y2xhc3MgU291bmQge1xuXHRcdG5hbWU6IHN0cmluZztcblx0XHRidWZmZXI6IEF1ZGlvQnVmZmVyO1xuXG5cdFx0Y29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBidWZmZXI6IEF1ZGlvQnVmZmVyKSB7XG5cdFx0XHR0aGlzLm5hbWUgPSBuYW1lO1xuXHRcdFx0dGhpcy5idWZmZXIgPSBidWZmZXI7XG5cdFx0fVxuXHR9XG5cblx0ZXhwb3J0IGNsYXNzIFNvdW5kU2VydmljZSB7XG5cdFx0cHJpdmF0ZSAkaHR0cDogbmcuSUh0dHBTZXJ2aWNlO1xuXHRcdHByaXZhdGUgJHE6IG5nLklRU2VydmljZTtcblx0XHRwcml2YXRlIHNvdW5kczogU291bmRbXTtcblx0XHRwcml2YXRlIGNvbnRleHQ6IEF1ZGlvQ29udGV4dDtcblxuXHRcdC8vIEBuZ0luamVjdFxuXHRcdGNvbnN0cnVjdG9yKCR3aW5kb3c6IFdlYkF1ZGlvRW5hYmxlZFdpbmRvdywgJGh0dHA6IG5nLklIdHRwU2VydmljZSwgJHE6IG5nLklRU2VydmljZSkge1xuXHRcdFx0dGhpcy4kd2luZG93ID0gJHdpbmRvdztcblx0XHRcdHRoaXMuJGh0dHAgPSAkaHR0cDtcblx0XHRcdHRoaXMuJHEgPSAkcTtcblx0XHRcdHRoaXMuc291bmRzID0gW107XG5cdFx0fVxuXG5cdFx0aW5pdGlhbGl6ZSgpIHtcblx0XHRcdGlmKCEhIXRoaXMuY29udGV4dCl7XG5cdFx0XHRcdGlmICh0aGlzLiR3aW5kb3cuQXVkaW9Db250ZXh0KVxuXHRcdFx0XHRcdHRoaXMuY29udGV4dCA9IG5ldyB0aGlzLiR3aW5kb3cuQXVkaW9Db250ZXh0KCk7XG5cdFx0XHRcdGVsc2UgaWYgKHRoaXMuJHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpXG5cdFx0XHRcdFx0dGhpcy5jb250ZXh0ID0gbmV3IHRoaXMuJHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQoKTtcblx0XHRcdFx0ZWxzZSB0aHJvdyAnYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSB3ZWIgYXVkaW8gYXBpJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRsb2FkU291bmQoc291bmRJbmZvOiBTb3VuZEluZm9ybWF0aW9uKTogbmcuSVByb21pc2U8U291bmQ+IHtcblx0XHRcdHRoaXMuaW5pdGlhbGl6ZSgpOyAvLyBsYXp5IGluaXRcblxuXHRcdFx0dmFyIGRlZmVycmVkID0gdGhpcy4kcS5kZWZlcigpO1xuXG5cdFx0XHR0aGlzLiRodHRwLmdldChzb3VuZEluZm8uc3JjLCB7IHJlc3BvbnNlVHlwZTogJ2FycmF5YnVmZmVyJyB9KVxuXHRcdFx0XHQudGhlbigocmVzcG9uc2U6IG5nLklIdHRwUHJvbWlzZUNhbGxiYWNrQXJnPEFycmF5QnVmZmVyPikgPT4ge1xuXHRcdFx0XHRcdHRoaXMuY29udGV4dC5kZWNvZGVBdWRpb0RhdGEocmVzcG9uc2UuZGF0YSwgKGF1ZGlvQnVmZmVyOiBBdWRpb0J1ZmZlcikgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKGF1ZGlvQnVmZmVyLmR1cmF0aW9uID4gNTApXG5cdFx0XHRcdFx0XHRcdHRocm93IHNvdW5kSW5mby5uYW1lICsgJyBpcyB0b28gbG9uZywgdGhpcyBtb2R1bGUgaXMgZGVzaWduZWQgdG8gaGFuZGxlIHNvdW5kcyBsZXNzIHRoYW4gNTBzIGxvbmcnO1xuXG5cdFx0XHRcdFx0XHR2YXIgc291bmQgPSBuZXcgU291bmQoc291bmRJbmZvLm5hbWUsIGF1ZGlvQnVmZmVyKTtcblx0XHRcdFx0XHRcdHRoaXMuc291bmRzLnB1c2goc291bmQpO1xuXG5cdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHRoaXMuZ2V0QnVmZmVyU291cmNlKHNvdW5kKSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0sIChyZWFzb24pID0+IHsgdGhyb3cgcmVhc29uIH0pO1xuXG5cdFx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcblx0XHR9XG5cblx0XHRnZXRTb3VuZChuYW1lOiBzdHJpbmcpOiBBdWRpb0J1ZmZlclNvdXJjZU5vZGUge1xuXHRcdFx0dGhpcy5pbml0aWFsaXplKCk7IC8vIGxhenkgaW5pdFxuXG5cdFx0XHRmb3IgKHZhciBpIGluIHRoaXMuc291bmRzKSB7XG5cdFx0XHRcdGlmICh0aGlzLnNvdW5kc1tpXS5uYW1lID09PSBuYW1lKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0QnVmZmVyU291cmNlKHRoaXMuc291bmRzW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR0aHJvdyAnbm8gbG9hZGVkIHNvdW5kIGNhbGxlZCBcIicgKyBuYW1lICsgJ1wiJztcblx0XHR9XG5cblx0XHRwcml2YXRlIGdldEJ1ZmZlclNvdXJjZShzb3VuZDogU291bmQpOiBBdWRpb0J1ZmZlclNvdXJjZU5vZGUge1xuXHRcdFx0dmFyIGJ1ZmZlclNvdXJjZTogQXVkaW9CdWZmZXJTb3VyY2VOb2RlO1xuXHRcdFx0YnVmZmVyU291cmNlID0gdGhpcy5jb250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuXHRcdFx0YnVmZmVyU291cmNlLmJ1ZmZlciA9IHNvdW5kLmJ1ZmZlcjtcblx0XHRcdGJ1ZmZlclNvdXJjZS5jb25uZWN0KHRoaXMuY29udGV4dC5kZXN0aW5hdGlvbik7XG5cblx0XHRcdHJldHVybiBidWZmZXJTb3VyY2U7XG5cdFx0fVxuXHR9XG59XG5cbmFuZ3VsYXJcblx0Lm1vZHVsZSgnbWN3ZWJiLnNvdW5kJywgW10pXG5cdC5zZXJ2aWNlKCdTb3VuZFNlcnZpY2UnLCBBbmd1bGFyU291bmQuU291bmRTZXJ2aWNlKTsiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy93ZWJhdWRpby5kLnRzXCIgLz5cbnZhciBBbmd1bGFyU291bmQ7XG4oZnVuY3Rpb24gKEFuZ3VsYXJTb3VuZCkge1xuICAgIHZhciBTb3VuZCA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFNvdW5kKG5hbWUsIGJ1ZmZlcikge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyID0gYnVmZmVyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTb3VuZDtcbiAgICB9KCkpO1xuICAgIHZhciBTb3VuZFNlcnZpY2UgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBAbmdJbmplY3RcbiAgICAgICAgZnVuY3Rpb24gU291bmRTZXJ2aWNlKCR3aW5kb3csICRodHRwLCAkcSkge1xuICAgICAgICAgICAgdGhpcy4kd2luZG93ID0gJHdpbmRvdztcbiAgICAgICAgICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcbiAgICAgICAgICAgIHRoaXMuJHEgPSAkcTtcbiAgICAgICAgICAgIHRoaXMuc291bmRzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgU291bmRTZXJ2aWNlLnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCEhIXRoaXMuY29udGV4dCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLiR3aW5kb3cuQXVkaW9Db250ZXh0KVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQgPSBuZXcgdGhpcy4kd2luZG93LkF1ZGlvQ29udGV4dCgpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuJHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IG5ldyB0aGlzLiR3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0KCk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyAnYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSB3ZWIgYXVkaW8gYXBpJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgU291bmRTZXJ2aWNlLnByb3RvdHlwZS5sb2FkU291bmQgPSBmdW5jdGlvbiAoc291bmRJbmZvKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7IC8vIGxhenkgaW5pdFxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gdGhpcy4kcS5kZWZlcigpO1xuICAgICAgICAgICAgdGhpcy4kaHR0cC5nZXQoc291bmRJbmZvLnNyYywgeyByZXNwb25zZVR5cGU6ICdhcnJheWJ1ZmZlcicgfSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5jb250ZXh0LmRlY29kZUF1ZGlvRGF0YShyZXNwb25zZS5kYXRhLCBmdW5jdGlvbiAoYXVkaW9CdWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF1ZGlvQnVmZmVyLmR1cmF0aW9uID4gNTApXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBzb3VuZEluZm8ubmFtZSArICcgaXMgdG9vIGxvbmcsIHRoaXMgbW9kdWxlIGlzIGRlc2lnbmVkIHRvIGhhbmRsZSBzb3VuZHMgbGVzcyB0aGFuIDUwcyBsb25nJztcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdW5kID0gbmV3IFNvdW5kKHNvdW5kSW5mby5uYW1lLCBhdWRpb0J1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNvdW5kcy5wdXNoKHNvdW5kKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShfdGhpcy5nZXRCdWZmZXJTb3VyY2Uoc291bmQpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHsgdGhyb3cgcmVhc29uOyB9KTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9O1xuICAgICAgICBTb3VuZFNlcnZpY2UucHJvdG90eXBlLmdldFNvdW5kID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpOyAvLyBsYXp5IGluaXRcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5zb3VuZHMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zb3VuZHNbaV0ubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRCdWZmZXJTb3VyY2UodGhpcy5zb3VuZHNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93ICdubyBsb2FkZWQgc291bmQgY2FsbGVkIFwiJyArIG5hbWUgKyAnXCInO1xuICAgICAgICB9O1xuICAgICAgICBTb3VuZFNlcnZpY2UucHJvdG90eXBlLmdldEJ1ZmZlclNvdXJjZSA9IGZ1bmN0aW9uIChzb3VuZCkge1xuICAgICAgICAgICAgdmFyIGJ1ZmZlclNvdXJjZTtcbiAgICAgICAgICAgIGJ1ZmZlclNvdXJjZSA9IHRoaXMuY29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICAgICAgICAgIGJ1ZmZlclNvdXJjZS5idWZmZXIgPSBzb3VuZC5idWZmZXI7XG4gICAgICAgICAgICBidWZmZXJTb3VyY2UuY29ubmVjdCh0aGlzLmNvbnRleHQuZGVzdGluYXRpb24pO1xuICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlclNvdXJjZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFNvdW5kU2VydmljZTtcbiAgICB9KCkpO1xuICAgIEFuZ3VsYXJTb3VuZC5Tb3VuZFNlcnZpY2UgPSBTb3VuZFNlcnZpY2U7XG59KShBbmd1bGFyU291bmQgfHwgKEFuZ3VsYXJTb3VuZCA9IHt9KSk7XG5hbmd1bGFyXG4gICAgLm1vZHVsZSgnbWN3ZWJiLnNvdW5kJywgW10pXG4gICAgLnNlcnZpY2UoJ1NvdW5kU2VydmljZScsIEFuZ3VsYXJTb3VuZC5Tb3VuZFNlcnZpY2UpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
