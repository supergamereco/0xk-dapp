<template>
  <div class="footer-policy">
    <div class="line-footer">
      <hr class="line" style="margin-bottom: unset; color: #888E97;"/>
    </div>
    <div class="row logo-content">
      <div class="col-md-6" style="padding-left: 0px;">
        <b-nav>
          <b-nav-item disabled>
          <p class="text-end-footer">
            {{ $t("footer.ref") }}
          </p>
          </b-nav-item>
        </b-nav>
      </div>
      <div class="col-md-6 text-right-footer p-0">
        <b-nav>
          <b-nav-item href="/privacy-policy">
            <p class="text-end-footer right" style="padding-top : 0px">
              {{ $t("footer.policy") }}
            </p>
          </b-nav-item>
          <b-nav-item href="/terms-of-service">
            <p class="text-end-footer right" style="padding-top : 0px; padding-right : 0px">
              {{ $t("footer.term") }}
            </p>
            </b-nav-item>
        </b-nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "footer-policy",
};
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";
.row.text-footer-row {
    margin-right: 5%;

    @media (max-width: $tablet) {
        margin-right: 0rem;
    }
}

.text-right-footer{
  // text-align : right;
  display: flex; 
  justify-content: flex-end;

    @media (max-width: 768px) {
    justify-content: normal;
  }
}

span.text-end-footer.right {
    font-weight: normal;
    font-size: 16px;
    line-height: 30px;
    letter-spacing: -0.015em;
    color: $dark-1;
}

p.text-end-footer {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 30px;
    letter-spacing: -0.015em;
    color: $dark-1;
}

p.text-end-footer.right {
  color: $dark-1;
}

footer .logo-content:last-child p {
  margin-bottom: 0 !important;
}

</style>