;(function() {
	const $tasksBox = document.querySelector('.js-tasks');
	const $completedTaskBox = document.querySelector('.js-completed-tasks');
	const $inputAddTask = document.querySelector('.task-item__input--mode-add');

	document.querySelector('.js-add-task').addEventListener('click', function(e) {
		e.preventDefault();

		if ($inputAddTask.value === '') return;

		$tasksBox.append(createNewTask($inputAddTask.value));

		$inputAddTask.value = '';
	});

	document.addEventListener('click', function(e) {
		const $targetCheckbox = e.target.closest('.task-item__checkbox');

		if ($targetCheckbox) {
			const $parent = $targetCheckbox.closest('.task-item');
			const completedClass = 'task-item--mode-completed';

			if ($targetCheckbox.checked) {
				$parent.classList.add(completedClass);
				$completedTaskBox.append($parent);
			} else {
				$parent.classList.remove(completedClass);
				$tasksBox.append($parent);
			}

			return;
		}

		const $targetDeleteButton = e.target.closest('.js-delete-button');

		if ($targetDeleteButton) {
			$targetDeleteButton.closest('.task-item').remove();

			return;
		}

		const $targetEditButton = e.target.closest('.js-edit-button');

		if ($targetEditButton) {

			const $parent = $targetEditButton.closest('.task-item');
			const editClass = 'task-item--mode-edit';

			if ($parent.classList.contains(editClass)) {
				saveEditedValue($parent);
				$targetEditButton.innerText = 'Edit';
				$parent.classList.remove(editClass);
			} else {
				$targetEditButton.innerText = 'Save';
				$parent.classList.add(editClass)
			}
		}
	})

	function createNewTask (text) {
		const $newTask = document.createElement("li");
		$newTask.classList.add('task-item');

		const $newTaskCheckbox = document.createElement("input");

		$newTaskCheckbox.type = 'checkbox';
		$newTaskCheckbox.classList.add('task-item__checkbox');

		const $newTaskLabel = document.createElement("label");

		$newTaskLabel.classList.add('task-item__label');
		$newTaskLabel.innerText = text;

		const $newTaskInput = document.createElement("input");

		$newTaskInput.type = 'text';
		$newTaskInput.className = 'task-item__input site-input';
		$newTaskInput.value = text;

		const $newTaskEditButton = document.createElement("button");

		$newTaskEditButton.className = 'js-edit-button site-button';
		$newTaskEditButton.innerText = 'Edit';

		const $newTaskDeleteButton = document.createElement("button");

		$newTaskDeleteButton.className = 'js-delete-button site-button';
		$newTaskDeleteButton.innerHTML = '<img class="task-item__delete-image" src="./remove.svg" alt="Remove task">';

		$newTask.append($newTaskCheckbox, $newTaskLabel, $newTaskInput, $newTaskEditButton, $newTaskDeleteButton);

		return $newTask;
	}

	function saveEditedValue ($parent) {
		$parent.querySelector('.task-item__label').innerText = $parent.querySelector('.task-item__input').value;
	}
})();