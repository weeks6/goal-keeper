<template>
	<h1>
		{{ data?.greeting }}
	</h1>
</template>
<script setup lang="ts">
const { $client } = useNuxtApp();

const { data, error } = $client.hello.useQuery({
	name: 'test',
});
</script>
