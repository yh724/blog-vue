<template>
    <div>
        <mavon-editor
                ref="md"
                placeholder="请输入文档内容..."
                :boxShadow="true"
                style="z-index:1;border: 1px solid #d9d9d9;height:50vh"
                v-model="content"
        />
    </div>
</template>

<script>
    export default {
        name: "home",
        components: {},
        data() {
            return {
                content: "",
            };
        },
        methods: {
        }
    };
</script>

<style scoped>

</style>