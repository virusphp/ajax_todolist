//menampilkan modal todolist
$('body').on('click', '.show-todolist-modal', function(event) {
	event.preventDefault();

	var me = $(this),
		url = me.attr('href'),
		title = me.attr('title');

	$('#todo-list-title').text(title);
	$('#todo-list-save-btn').text(me.hasClass('edit') ? 'Update' : 'Create New');

	$.ajax({
		url: url,
		dataType: 'html',
		success : function(response) {
			$('#todo-list-body').html(response);
		}
	});

	$('#todolist-modal').modal('show');
});

//fungsi show message
function showMessage (message, element) {
	var alert = element == undefined ? '#add-new-alert' : element;
	$(alert).text(message).fadeTo(1000,500).slideUp(500, function() {
		$(this).hide();
	});
}
//fungsi update counter
function updateTodoListCounter () {
	var total = $('.list-group-item').length;
	$('#todo-list-counter').text(total).next().text(total > 1 ? 'records' : 'record');

	showNoRecordMessage(total);
}

//fungsi menampilkan pesan tidak ada data tersimpan
function showNoRecordMessage (total) {
	if (total > 0) {
		$('#todo-list').closest('.panel').removeClass('hidden');
		$('#no-record-alert').addClass('hidden');
	}
	else {
		$('#todo-list').closest('.panel').addClass('hidden');
		$('#no-record-alert').removeClass('hidden');
	}
}

//penanganan tombol enter pada modal
$('#todolist-modal').on('keypress', ":input:not(textarea)", function(event) {
	return event.keyCode != 13;
});

//untuk menyimpan data ketika tombol save di klik
$('#todo-list-save-btn').click(function(event) {
	event.preventDefault();

	//mendefinisikan url berada pada form list-body dan action
	var form = $('#todo-list-body form'),
		url = form.attr('action'),
		method = $('input[name=_method]').val() == undefined ? 'POST' : 'PUT';

	// mereset pesan kesalahan
	form.find('.help-block').remove();
	form.find('.form-group').removeClass('has-error');

	$.ajax({
		url: url,
		method: method,
		data: form.serialize(),
		success : function(response) {
			if (method == 'POST') 
			{

				$('#todo-list').prepend(response);

				showMessage("Todo list berhasil di buat");

				form.trigger('reset');
				$('#title').focus();

				$('#todolist-modal').fadeTo(1000,500).slideUp(500, function() {
					$(this).modal('hide');
				});

				updateTodoListCounter();

			}
			else {
				var id = $('input[name=id]').val();
				if (id) {
					$('#todo-list-' + id).replaceWith(response);
				}

				$('#todolist-modal').modal('hide');

				showMessage('Todo List has been updated', '#update-alert');
			}

			
		},
		error: function(xhr) {
			var errors = xhr.responseJSON;
			if ($.isEmptyObject(errors) == false )
			{
				$.each(errors, function(key, value) {
					$('#' + key)
						.closest('.form-group')
						.addClass('has-error')
						.append('<span class="help-block"><strong>' +  value + '</strong></span>')
				});
			}
		}
	});
});

//menampilkan modal konfirmasi delete
$('body').on('click', '.show-confirm-modal', function(event) {
	event.preventDefault();

	var me = $(this),
		title = me.attr('data-title'),
		action = me.attr('href');

	$('#confirm-body form').attr('action', action);
	$('#confirm-body p').html("apa kamu yakin ingin menghapus list: <strong>" + title + "</strong> ");	
	$('#confirm-modal').modal('show');
});

//membuat kombol remove dengan ajax
$('#confirm-remove-btn').click(function(event) {
	event.preventDefault();

	var form = $('#confirm-body form'),
		url = form.attr('action');

	$.ajax({
		url : url,
		method : 'DELETE',
		data: form.serialize(),
		success: function(data) {
			$('#confirm-modal').modal('hide');

			$('#todo-list-' + data.id).fadeOut(function() {
				$(this).remove();
				updateTodoListCounter();
			});
		}
	});
});

//menampilkan modal taskmodal
$('.show-task-modal').click(function(event) {
	event.preventDefault();

	$('#task-modal').modal('show');
});

//membuat checkbox berwarna hijau dan kotak variasi dari iCheck
$(function() {
	$('input[type=checkbox]').iCheck({
		checkboxClass: 'icheckbox_square-green',
		increaseArea: '20%'
	});

	$('#check-all').on('ifChecked', function(e) {
		$('.check-item').iCheck('check');
	});

	$('#check-all').on('ifUnchecked', function(e) {
		$('.check-item').iCheck('uncheck');
	});
});  