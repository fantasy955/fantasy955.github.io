<template>
  <div class="container" id="header">
		<div class="row justify-content-center">
			<div class="col-2" id="cityINFO">
				<h5 style="height: auto;">
					<p class="text-center">{{cityName}}<br>Weather</p>
				</h5>
			</div>
			<div class="col-2 mb-0">
				<img src="../../custom/qweather-icons/icons/100.svg" fill="#1C242C" alt="QWeather" width="32" height="32">
			</div>
		</div>
	</div>
</template>

<script>
import uConfig from "../../custom/config";

export default {
    data() {
        return {
            cityName: uConfig.cityName
        }
    },
}
</script>

<style>

</style>