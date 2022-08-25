<template>
  <div class="container jumbotron jumbotron-fluid mb-3 pt-0 pb-0 bg-gray position-relative"
					style="margin-bottom: 5px;" v-bind:id="['div-'+categoryInfo.sname]">
					<h5 class="mt-1 btn btn-dark font-weight-bold"><span
							style="padding-bottom: 5px">{{categoryInfo.aname}}</span></h5>
					<div class="mb-1 d-flex justify-content-center border-bottom"></div>
					<ol class="list-featured" v-bind:id="['ol-files-'+categoryInfo.sname]">
						<li class="mb-md-2" v-for="file in categoryInfo.filteredPageFiles" :key="file.name">
							<div class="pl-3 justify-content-center">
								<h6 class="font-weight-bold" style="margin-bottom: 0;"><a class="text-dark"
										v-bind:href="`${categoryInfo.sname}/${file.name}`" style="cursor: pointer;"
										v-on:click.prevent="(event) => toBlogDetailsPage(categoryInfo.sname, file.name, categoryInfo.path, event)">{{file.name}}</a>
								</h6>
								<div class="card-text text-muted small">
									Fantasy955
								</div>
								<small
									class="text-muted">{{file.updatetime.year}}年{{file.updatetime.mon}}月{{file.updatetime.day}}日
									更新</small>
							</div>
						</li>
					</ol>
					<div class="card-text mr-1" v-if="categoryInfo.more" v-on:click="(event) => showAll(categoryInfo.sname, event)">
						<p class="pl-md-1 pr-md-1 c-pointer text-primary">View All</p>
					</div>
					<div class="card-text mr-1" v-if="categoryInfo.layaside"
						v-on:click="(event) => layAside(categoryInfo.sname, event)">
						<p class="pl-md-1 pr-md-1 c-pointer text-primary">收起</p>
					</div>
					<div class="row pl-3 justify-content-center">
						<div class="card-text small" v-if="!categoryInfo.layaside">
							<p class="text-muted">总共 {{categoryInfo.totalPage}} 页, 当前第 {{categoryInfo.pageindex+1}} 页</p>
						</div>
						<div class="ml-1 card-text small" v-if="!categoryInfo.layaside">
							<p class="c-pointer bg-white" v-if="categoryInfo.pageindex>0"
								v-on:click="(event)=>prePage(categoryInfo.sname, event)">上一页</p>
						</div>
						<div class="ml-1 card-text small" v-if="!categoryInfo.layaside">
							<p class="c-pointer badge-white" v-if="categoryInfo.pageindex+1<categoryInfo.totalPage"
								v-on:click="(event)=>nextPage(categoryInfo.sname, event)">下一页</p>
						</div>
					</div>
				</div>
</template>

<script>
export default {

}
</script>

<style>

</style>