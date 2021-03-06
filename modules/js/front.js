jQuery(document).ready( function($){
	$( ".sortable_survey" ).sortable();
	$( ".sortable_survey" ).disableSelection();
	$('#user-info-form').on('submit', function(event) {
		event.preventDefault();
		handleNext($('.single_slide.active_slide'));
	});
	
	$('body').on('click', '.survey_cont .next_button', function(){
		var current_slide = $('.single_slide.active_slide');

		if ( current_slide.hasClass('first_slide') ) {
			$('<input type="submit">').hide().appendTo('#user-info-form').click().remove();
			return;
		}

		handleNext(current_slide);
	});

	function handleNext(current_slide) {
		var next_pnt = current_slide.next('.single_slide');
		
		$('.active_slide').removeClass('active_slide');
		next_pnt.addClass('active_slide');
		
		// if next exists
		var next_next = next_pnt.next('.single_slide');
		if( next_next.length == 0 ){
			//$('.prev_button').attr('disabled', false);
			$(this).attr('disabled', true);
			
			$('.survey_cont .submit_block').removeClass('d-none');
			$('.next_button_block').hide();
		}


		var prev_pnt = current_slide.prev('.single_slide');
		if( prev_pnt.length == 0 ){
			$('.prev_button').attr('disabled', false);
			 
		}
	}
	
	$('body').on('click', '.prev_button', function(){
		var current_slide = $('.single_slide.active_slide');
		var next_pnt = current_slide.prev('.single_slide');
		
		$('.active_slide').removeClass('active_slide');
		next_pnt.addClass('active_slide');
		
		// if next exists
		var next_next = next_pnt.prev('.single_slide');
		if( next_next.length == 0 ){
			$('.next_button').attr('disabled', false);
			$(this).attr('disabled', true);
		}	
		
		var prev_pnt = current_slide.next('.single_slide');
		if( prev_pnt.length == 0 ){
			$('.next_button').attr('disabled', false);
			 
		}
		$('.survey_cont .submit_block').addClass('d-none');
		$('.next_button_block').show();
	})
	
	
	$('body').on('click', '.submit_button', function(){
		
		var obj = [];
		$('.single_slide.survey_data').each(function(){
			var answers = [];
			$('.single_variant', this).each(function(){
				answers.push( $(this).attr('data-value')  );
			})
			obj.push( answers );
		});

		var user_data = $('#user-info-form').serialize();
		var data = {
			user_data : user_data,
			results  : obj,
			action : 'submit_results'
		}
		jQuery.ajax({url: wsp_local_data.ajaxurl,
				type: 'POST',
				data: data,            
				beforeSend: function(msg){
						jQuery('.loader').fadeIn();
					},
					success: function(msg){
						
						
						jQuery('.loader').fadeOut();
						var obj = jQuery.parseJSON( msg );
						 
						if( obj.result == 'success'){
							$('.survey_cont .container').hide();
							 $('.survey_cont .container').html( obj.text );
							 $('.survey_cont .container').fadeIn();
						} 
						 
					} , 
					error:  function(msg) {
									
					}          
			});
	})
	
}) // global end
