<script>
	import {
		Navbar,
		NavbarBrand,
		Collapse,
		Nav,
		NavItem,
		Button,
		Table,
		Modal,
		ModalBody,
		ModalFooter,
		ModalHeader,
		Input
	} from 'sveltestrap';
	
	let isDiscriptionModalOpen = false;
	function toggleDiscriptionModal() {
		isDiscriptionModalOpen = !isDiscriptionModalOpen;
	}
	
	let isFormatErrorModalOpen = false;
	function toggleFormatErrorModal() {
		isFormatErrorModalOpen = !isFormatErrorModalOpen;
	}
	
	let collegeList = [];
	function handlePaste(e) {
		let items = e.clipboardData?.items;
		if(!items) return;
		for(let i = 0; i < items.length; i++) {
        	const item = items[i];
        	if(item.kind === 'string' && item.type === 'text/plain') {
				item.getAsString((data) => {
					const cols = data.split('\t').map((x) => x.trim());
					const schoolId = cols[1];
					const schoolName = cols[2];
					const majorId = cols[3];
					const majorName = cols[4];
					if(schoolId && schoolName && majorId && majorName) {
						collegeList = [ ...collegeList, {id: collegeList.length + 1, schoolId: schoolId, schoolName: schoolName, majorId: majorId, majorName: majorName}];
					} else {
						toggleFormatErrorModal();
					}
				})
			}
		}
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/minty/bootstrap.min.css">
</svelte:head>

<Navbar color="primary" dark expand="xl">
	<NavbarBrand href="/">浙江高考志愿填报助手</NavbarBrand>
	<Collapse isOpen=true navbar expand="xl">
		<Nav navbar>
			<NavItem>
				<Button color="secondary" on:click={toggleDiscriptionModal}>使用说明</Button>
			</NavItem>
		</Nav>
	</Collapse>
</Navbar>

<Modal isOpen={isDiscriptionModalOpen} {toggleDiscriptionModal}>
	<ModalHeader {toggleDiscriptionModal}>
		使用说明
	</ModalHeader>
	<ModalBody>
		先在考试院官网下载导出志愿表，无需启用宏，可删去首行后开启筛选。<br />
		每选择一个专业，选中对应的行，在步骤一的对应区域粘贴即可增加专业选择。<br />
		选择后可拖动以调整顺序，按垃圾桶按钮可以删除。<br />
		保存按钮可以在本地暂存志愿信息，加载按钮可以加载暂存的志愿信息。<br />
		步骤二下载的志愿表会将前80个志愿保存，可直接在系统内导入。
	</ModalBody>
	<ModalFooter>
		<Button color="primary" on:click={toggleDiscriptionModal}>确认</Button>
	</ModalFooter>
</Modal>

<Modal isOpen={isFormatErrorModalOpen} {toggleFormatErrorModal}>
	<ModalHeader {toggleFormatErrorModal}>
		格式错误
	</ModalHeader>
	<ModalBody>
		请在导出表中复制目标行，并粘贴于输入框内。
	</ModalBody>
	<ModalFooter>
		<Button color="primary" on:click={toggleFormatErrorModal}>确认</Button>
	</ModalFooter>
</Modal>

<input class="form-control" placeholder="请在导出表中复制目标行，并粘贴于输入框内。" on:paste|preventDefault={handlePaste}/>

<Table striped>
	<thead>
		<tr>
			<th>#</th>
			<th>院校代码</th>
			<th>院校名称</th>
			<th>专业代码</th>
			<th>专业名称</th>
		</tr>
	</thead>
	<tbody>
		{#each collegeList as college}
			<tr>
				<th>{college.id}</th>
				<th>{college.schoolId}</th>
				<th>{college.schoolName}</th>
				<th>{college.majorId}</th>
				<th>{college.majorName}</th>
			</tr>
		{/each}
	</tbody>
</Table>
