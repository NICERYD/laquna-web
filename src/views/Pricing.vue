<script>
export default {
  data() {
    return {
      companyUrl: "",
    };
  },

  mounted() {
    this.getCompanyUrl();
  },

  methods: {
    getCompanyUrl() {
      //user에 따라 회사 홈페이지 주소 가져오는 함수
    },
  },
};
</script>

<template>
  <iframe class="company-frame" :src="companyUrl" frameborder="0"></iframe>
</template>

<style lang="scss" scoped>
.company-frame {
  width: 100%;
  height: 800px;
  overflow: hidden;
}
</style>
