jQuery('small').prepend('<div id="preloader">Loading...</div>');
jQuery(document).ready(function(){
    
    axios.get('http://csc225.mockable.io/movies')
        .then(function(response){
            console.log(response.data);
            var moviesHTML = response.data.map(function(movie){
            return  '<li  data-movie="'+movie.id+'" class="movie list-group-item d-flex justify-content-between align-items-center">'
                    
                 + 
                movie.title +  '</li>';
                
            });
    
            $('#movies').html(moviesHTML);
                jQuery("#preloader").remove();

        });

        $('body').on('click', '.movie', function(){

            $("li").css("background-color", "#fff");

            $('.card').prepend('<div id="preloader">&nbsp;Loading Details...</div>');
            var id = $(this).data('movie');
            var url = 'http://csc225.mockable.io/movies/' + id;

            $(this).css("background-color", "#efede8");
            axios.get(url).then(function(response){
                var movie = response.data;
                
                //get image titile 
                var str=movie.poster;
                str=str.split("/");
                var last_part = str[str.length-1]
                //get image titile

               
                $('.card').html('<img src="'+movie.poster+'" alt="'+last_part+'"/>');
                $( ".card" ).append('<div class="card-body"><b>Title:&nbsp;</b>'+ movie.title+'<br><b>Released Year:&nbsp;</b>'+movie.release+'<br><b>Director:&nbsp;</b>'+movie.director+'</div>');
                $('.card').attr('id', movie.id);           
                
            });        

        });

});