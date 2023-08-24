<template>
    <div class="privacy">
      <div class="row contents-policy">
        <div class="col-12">
          <br/><br/><br/><br/>
          <div class="content">
            <h2><center>Coming soon</center></h2>
          </div>
        </div>
<!--        <div-->
<!--          class="col-12"-->
<!--          v-for="(data, index) in dataList"-->
<!--          :key="index"-->
<!--        >-->
<!--          <div class="content">-->
<!--            <p class="contents-title" style="font-weight: bold; margin-top: 1.5rem;">{{ data.title_detail }}</p>-->
<!--            <p class="contents-title" style="margin-top: 1.5rem;">{{ data.content_detail }}</p>-->
<!--            <div-->
<!--              class="detail-content"-->
<!--              v-for="(detail, idx) in data.detail"-->
<!--              :key="idx"-->
<!--            >-->
<!--              <p class="contents" style="margin-top: 1rem; text-indent: 25px;">{{ detail }}</p>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
</template>

<script>
export default {
    name: 'privacy',
    props: {
        dataList: { type: Array, required: false}
    }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/_variables.scss';

.row.contents-policy {
    padding: 0% 6.5%;
}

.content {
  font-size: 16px;
  line-height: 24px;
}

</style>
