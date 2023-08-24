<template>
  <div class="section-founder">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <div class="row section__image_founder">
            <div 
              class="col-lg-3 col-md-3 col-sm-12 image-founder"
              v-for="(values, index) in $t('about.founder.lists')"
              :key="index"
              >
              <div class="founder-content">
                <b-img :src="values.image" class="img-founder"></b-img>
                <p class="title-content">{{values.name}}</p>
                <p class="detail-content">
                  {{ values.position }}
                </p>
                <p class="email-content">
                  {{ values.email }}
                </p>
              </div>
            </div>
            <div
              class="col-lg-3 col-md-3 col-sm-12 image-founder">
                <div class="founder-content"
                style="
                  min-height: auto;
                  min-width: 100%;"
                >
                <div class="circle__image_bg">
                  <div class="circle-founder">
                    <span class="text-member"> {{ $t('about.founder.members_list.numbers')}} </span>
                  </div>
                </div>

                  <p class="title-content">{{ $t("about.founder.members_list.name") }}</p>
                  <p class="detail-content">
                    {{ $t("about.founder.members_list.position") }}
                  </p>
                </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "section-founder",
}
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";
@import "@/scss/Founder.scss";

.section__image_founder {
    display: flex;
    justify-content: center;
}

.circle__image_bg {
    display: flex;
    justify-content: center;
    min-width: 100%;
    min-height: auto;
}

p.email-content {
    margin-top: -0.5rem;
    font-weight: 400;
    font-size: 18px;
    line-height: 30px;
    text-align: center;
    letter-spacing: -0.015em;
    color: $light-grey-2;
}
</style>