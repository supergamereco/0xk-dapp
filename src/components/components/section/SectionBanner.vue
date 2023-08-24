<template>
  <div class="section-banner">
    <div class="container">
      <div class="row" style="justify-content: center;">
        <div class="col-lg-7 col-md-12 col-sm-12 bg-banner">
          <div class="banner-text">
            <h2 class="title-about-banner">
              {{ $t("about.banner.title") }}
            </h2>
            <div class="text-about-banner">
              <p class="text-banner">
                {{ $t("about.banner.detail-1") }}
              </p>
              <p class="text-banner">
                {{ $t("about.banner.detail-2") }}
              </p>
              <p class="text-banner">
                {{ $t("about.banner.detail-3") }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-5 col-md-12 col-sm-12 bg-banner">
          <div class="images-banner banner-text img-fluid">
            <img src="@/assets/aboutImages/question-symbol-non-fungible-token.png" class="img-banner" />
          </div>
        </div>
      </div>
      <div class="row" style="justify-content: center;">
        <div class="col-12 bg-banner">
          <div class="images-icon img-fluid">
            <div class="icon-1">
              <img src="@/assets/aboutImages/Ellipse_1.png" class="img-icon" />
              <p class="title">{{ $t("about.banner.year") }}</p>
              <p class="description">{{ $t("about.banner.founded") }}</p>
            </div>
            <div class="icon-2">
              <img src="@/assets/aboutImages/Ellipse_2.png" class="img-icon" />
              <p class="title">{{ $t("about.banner.emp-number") }}</p>
              <p class="description">{{ $t("about.banner.employee") }}</p>
            </div>
            <div class="icon-3">
              <img src="@/assets/aboutImages/Ellipse_3.png" class="img-icon" />
              <p class="title">{{ $t("about.banner.user-number") }}</p>
              <p class="description">{{ $t("about.banner.user") }}</p>
            </div>
            <div class="icon-4">
              <img src="@/assets/aboutImages/Ellipse_4.png" class="img-icon" />
              <p class="title">{{ $t("about.banner.nfts-amount") }}</p>
              <p class="description">{{ $t("about.banner.nfts") }}</p>
            </div>
            <div class="icon-5">
              <img src="@/assets/aboutImages/Ellipse_5.png" class="img-icon" />
              <p class="title">{{ $t("about.banner.volume-amount") }}</p>
              <p class="description">{{ $t("about.banner.volume") }}</p>
            </div>
          </div>
        </div>
        <!-- <div class="col-md-1 col-sm-1"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "section-banner",
  data: () => {
    return {
      year: "2021",
      employee: 80,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/About.scss";
@import "~@/scss/_variables.scss";
.section-banner {
  background: $white-bg;
  background-size: cover;
  margin-bottom: 1.75rem;
  color: $dark-1;
}

.banner-text {
  margin: 3rem 2rem 3rem 2rem;
}

.img-banner {
  vertical-align: middle;
  width: 100%;
  height: auto;
}

.text-about-banner {
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.015em;
  margin-top: 3rem;
}

.images-icon.img-fluid {
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  gap: 5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
}

p.title {
  font-weight: bold;
  font-size: 24px;
  line-height: 36px;
  text-align: center;
  letter-spacing: -0.015em;
  margin-top: 1.5rem;
}

p.description {
  margin-top: -0.75rem;
  font-weight: bold;
  font-size: 18px;
  line-height: 36px;
  text-align: center;
  letter-spacing: -0.015em;
  color: $yellow;
  // -webkit-text-fill-color: transparent;
}

h2.title-about-banner {
  font-weight: 700;
  font-size: 44px;
  line-height: 68px;
  white-space: pre-line;
  word-break: break-word;

  @media (max-width: 991px) {
    white-space: normal;
  }

  @media (min-width: 381px) and (max-width: $small) {
    font-size: 38px;
    line-height: 60px;
    white-space: normal;
  }

  @media (min-width: 321px) and (max-width: 380px) {
    font-size: 34px;
    line-height: 60px;
    white-space: normal;
  }

    @media (max-width: 320px) {
    font-size: 29px;
    line-height: 50px;
    white-space: normal;
  }
}

p.text-banner {
  margin-top: 1.5rem;
  font-weight: normal;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.015em;
  color: $dark-1;
}

.images-banner.img-fluid {
  display: flex;
  justify-content: center;

  @media (max-width: 991px) {
    width: 50%;
    margin: auto
  }
}

.bg-banner {
  background: #FEFAEB;
}
</style>
