'use strict';

angular.module('example366', ['ngTouch'])
  .controller('MainCtrl', function($scope){
	
	$scope.slider = {};
	
	$scope.slider.init = function(){
		$scope.slider._Index = 0;
		
		//Carga imagenes
		$scope.slider.imagenes = [
			{src: 'http://farm9.staticflickr.com/8042/7918423710_e6dd168d7c_b.jpg', nombre: 'Image 01', descripcion: 'desc img 01', fecha: '2015/12/02'},
			{src: 'http://farm9.staticflickr.com/8449/7918424278_4835c85e7a_b.jpg', nombre: 'Image 02', descripcion: 'desc img 02', fecha: '2015/12/03'},
			{src: 'http://farm9.staticflickr.com/8457/7918424412_bb641455c7_b.jpg', nombre: 'Image 03', descripcion: 'desc img 03', fecha: '2015/12/04'},
			{src: 'http://farm9.staticflickr.com/8179/7918424842_c79f7e345c_b.jpg', nombre: 'Image 04', descripcion: 'desc img 04', fecha: '2015/12/05'},
			{src: 'http://farm9.staticflickr.com/8315/7918425138_b739f0df53_b.jpg', nombre: 'Image 05', descripcion: 'desc img 05', fecha: '2015/12/06'},
			{src: 'http://farm9.staticflickr.com/8461/7918425364_fe6753aa75_b.jpg', nombre: 'Image 06', descripcion: 'desc img 06', fecha: '2015/12/07'},
			{src: 'teeth01.jpg', nombre: 'Image 07', descripcion: 'desc img 07', fecha: '2015/12/08'},
			{src: 'teeth02.jpg', nombre: 'Image 08', descripcion: 'desc img 08', fecha: '2015/12/09'},
			{src: 'teeth03.jpg', nombre: 'Image 09', descripcion: 'desc img 09', fecha: '2015/12/10'},
			{src: 'teeth04.jpg', nombre: 'Image 10', descripcion: 'desc img 10', fecha: '2015/12/11'},
			{src: 'teeth05.jpg', nombre: 'Image 11', descripcion: 'desc img 11', fecha: '2015/12/12'}
		];
		
		//Hace calculos para el carrusel de thumbnails
		var tamThumbnail = 90 + 16, //width + margin L & R,
			tamMax = tamThumbnail * $scope.slider.imagenes.length; //Tamaño maximo del thumbnail nav			
		$scope.slider.previewCarruselNumItems = 5; //Numero de items q se muestran en el preview del thumbnail	
		$scope.slider.avanceCarrusel = tamThumbnail;
		$scope.slider.maxAvanceCarrusel = tamMax - (tamThumbnail * $scope.slider.previewCarruselNumItems);	
		$scope.slider.$thumbnailNav = angular.element('.thumbnail-preview ul');
		
		//Codigo abre slider - Todo
	};
	
	$scope.slider.init();
  
    //Verifica si la imagen es la misma que la imagen requerida
    $scope.slider.esActiva = function(index){
		var esActiva = $scope.slider._Index === index;
		
		if(esActiva)
			$scope.slider.slide = $scope.slider.imagenes[$scope.slider._Index];
        
		return esActiva;
    };

    //Muestra la imagen anterior
    $scope.slider.irAnterior = function(){
		$scope.slider.cerrarEdicion('nombre');
		$scope.slider.cerrarEdicion('descripcion');
        $scope.slider._Index = ($scope.slider._Index > 0) ? --$scope.slider._Index : $scope.slider.imagenes.length - 1;
    };

    //Muestra la siguente imagen
    $scope.slider.irSiguiente = function(){
		$scope.slider.cerrarEdicion('nombre');
		$scope.slider.cerrarEdicion('descripcion');
        $scope.slider._Index = ($scope.slider._Index < $scope.slider.imagenes.length - 1) ? ++$scope.slider._Index : 0;
    };

    //Show a certain image
    $scope.slider.mostrarImagen = function(index){
		$scope.slider.cerrarEdicion('nombre');
		$scope.slider.cerrarEdicion('descripcion');
        $scope.slider._Index = index;
    };
	
	$scope.slider.guardarCambios = function(campo){
		if(campo == 'nombre'){
			if($scope.slider.nombreTxt.length > 0){
				if($scope.slider.slide.nombre != $scope.slider.nombreTxt){
					$scope.slider.slide.nombre = $scope.slider.nombreTxt;
					//guardar nombre
				}				
				$scope.slider.cerrarEdicion('nombre');
			}else{
				alert('Por favor introduzca el nombre.');
			}			
		}else{
			if($scope.slider.slide.descripcion != $scope.slider.descripcionTxt){
				$scope.slider.slide.descripcion = $scope.slider.descripcionTxt;
				//guardar campo
			}
			$scope.slider.cerrarEdicion('descripcion');
		}
	};
	
	//Oculta inputs para editar los campos
	$scope.slider.cerrarEdicion = function(campo){
		if(campo == 'nombre'){
			$scope.slider.nombreTxt = '';
			$scope.slider.editarNom  = false;
		}else{
			$scope.slider.descripcionTxt = '';
			$scope.slider.editarDesc = false;
		}
	};
	
	//Muestra inputs para editar los campos
	$scope.slider.mostrarEdicion = function(campo){
		if(campo == 'nombre'){
			$scope.slider.nombreTxt = $scope.slider.slide.nombre;
			$scope.slider.editarNom = true;
		}else{
			$scope.slider.descripcionTxt = $scope.slider.slide.descripcion;
			$scope.slider.editarDesc = true;
		}
	};
	
	$scope.slider.irAnteriorThumbnail = function(){
		if($scope.slider.imagenes.length > $scope.slider.previewCarruselNumItems){
			var left = parseFloat($scope.slider.$thumbnailNav.css('left').replace('px', '')),
				newLeft = left + $scope.slider.avanceCarrusel;
				
			if(newLeft > 0)
				newLeft = -1 * $scope.slider.maxAvanceCarrusel;
					
			$scope.slider.$thumbnailNav.css('left', newLeft +'px');
		}
	};
	
	$scope.slider.irSiguienteThumbnail = function(){
		if($scope.slider.imagenes.length > $scope.slider.previewCarruselNumItems){
			var left = (-1 * parseFloat($scope.slider.$thumbnailNav.css('left').replace('px', ''))),
				newLeft = left + $scope.slider.avanceCarrusel;
				
			if(newLeft > $scope.slider.maxAvanceCarrusel)
				newLeft = 0;
					
			$scope.slider.$thumbnailNav.css('left', (-1 * newLeft) +'px');
		}
	};
});
