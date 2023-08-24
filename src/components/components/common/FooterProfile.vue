<template>
  <div class="footer-profile">
    <div :id="isGameDetail == true ? 'footer-profile' : 'footer__profile'" class="footer-profile">
      <footer class="footer-bg text-white text-lg-start">
        <div class="container-fluid">
          <div class="line-footer">
            <hr class="line" style="margin-bottom: unset; margin-top: unset; color: #C8D3D7;"/>
          </div>
          <div class="row logo-content" style="padding-bottom : 0px;">
            <div class="col-lg-6 col-md-12 col-sm-12">
              <div class="footer-title">
                <div class="row link-footer">
                  <div class="col-md-4 col-lg-5">
                    <p>
                      <img
                        src="@/assets/img/n-commerce-logo.png"
                        class="mt-1 footer-profile__logo img-fluid"
                        loading="lazy"
                        @click="goToPage('/')" style="cursor: pointer"
                      />
                    </p>
                  </div>
                  <div class="col-md-8 col-lg-7 link-footer-custom">
                    <b-nav>
                      <b-nav-item @click="goToProfile('/profile')" ><p class="text-link-footer">
                          <!-- <b-link  id="link-a"> -->
                            {{ $t("footer.my-account") }}
                          <!-- </b-link> -->
                        </p></b-nav-item>
                      <b-nav-item disabled><p class="text-link-footer">
                          <b-link  id="link-b"  >
                            {{ $t("footer.resources") }}
                          </b-link>
                        </p></b-nav-item>
                      <b-nav-item disabled><p class="text-link-footer">
                          <b-link  id="link-c">
                            {{ $t("footer.company") }}
                          </b-link>
                        </p></b-nav-item>
                    </b-nav>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-12 col-sm-12 text-right-footer">
              <div class="row icon-join-us">
                <div class="col-md-6">
                  <h5 class="text-title-footer">
                    <span>{{ $t("footer.join-us") }}</span>
                  </h5>
                </div>
                <div class="col-md-6 justify-content-start icon-social">
                  <button type="nav-link" class="btn-top-icon mx-2" style="margin-left: 0px !important;">
                    <i
                      class="fab fa-facebook-f"
                    ></i>
                  </button>
                  <button type="nav-link" class="btn-top-icon mx-2">
                    <img style="margin: 0.5rem -0.5rem !important;" alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjEyNzUgMEg0Ljg3MjQzQzIuMTg1NzMgMCAwIDIuMTg1NzMgMCA0Ljg3MjQzVjEzLjEyNzdDMCAxNS44MTQyIDIuMTg1NzMgMTggNC44NzI0MyAxOEgxMy4xMjc3QzE1LjgxNDIgMTggMTggMTUuODE0MiAxOCAxMy4xMjc3VjQuODcyNDNDMTggMi4xODU3MyAxNS44MTQyIDAgMTMuMTI3NSAwVjBaTTE2Ljk0NDcgMTMuMTI3N0MxNi45NDQ3IDE1LjIzMjQgMTUuMjMyNCAxNi45NDQ3IDEzLjEyNzUgMTYuOTQ0N0g0Ljg3MjQzQzIuNzY3NTkgMTYuOTQ0NyAxLjA1NTIzIDE1LjIzMjQgMS4wNTUyMyAxMy4xMjc3VjQuODcyNDNDMS4wNTUyMyAyLjc2NzU5IDIuNzY3NTkgMS4wNTUyMyA0Ljg3MjQzIDEuMDU1MjNIMTMuMTI3N0MxNS4yMzI0IDEuMDU1MjMgMTYuOTQ0NyAyLjc2NzU5IDE2Ljk0NDcgNC44NzI0M1YxMy4xMjc3WiIgZmlsbD0id2hpdGUiLz4KPHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiByeD0iNSIgZmlsbD0iI0ZBRkFGQSIvPgo8cGF0aCBkPSJNOC45OTk4NSA0LjA3ODEyQzYuMjg1OTYgNC4wNzgxMiA0LjA3ODEyIDYuMjg1OTYgNC4wNzgxMiA4Ljk5OTg1QzQuMDc4MTIgMTEuNzEzNyA2LjI4NTk2IDEzLjkyMTYgOC45OTk4NSAxMy45MjE2QzExLjcxMzcgMTMuOTIxNiAxMy45MjE2IDExLjcxMzcgMTMuOTIxNiA4Ljk5OTg1QzEzLjkyMTYgNi4yODU5NiAxMS43MTM3IDQuMDc4MTIgOC45OTk4NSA0LjA3ODEyWk04Ljk5OTg1IDEyLjg2NjNDNi44Njc5NiAxMi44NjYzIDUuMTMzMzYgMTEuMTMxOSA1LjEzMzM2IDguOTk5ODVDNS4xMzMzNiA2Ljg2Nzk2IDYuODY3OTYgNS4xMzMzNiA4Ljk5OTg1IDUuMTMzMzZDMTEuMTMxOSA1LjEzMzM2IDEyLjg2NjMgNi44Njc5NiAxMi44NjYzIDguOTk5ODVDMTIuODY2MyAxMS4xMzE5IDExLjEzMTkgMTIuODY2MyA4Ljk5OTg1IDEyLjg2NjNaIiBmaWxsPSIjRjdDQTM4Ii8+CjxwYXRoIGQ9Ik0xNC4wMzgzIDIuMzMwMDhDMTMuMjM2MyAyLjMzMDA4IDEyLjU4NCAyLjk4MjUzIDEyLjU4NCAzLjc4NDM5QzEyLjU4NCA0LjU4NjM5IDEzLjIzNjMgNS4yMzg4NCAxNC4wMzgzIDUuMjM4ODRDMTQuODQwMyA1LjIzODg0IDE1LjQ5MjcgNC41ODYzOSAxNS40OTI3IDMuNzg0MzlDMTUuNDkyNyAyLjk4MjM5IDE0Ljg0MDMgMi4zMzAwOCAxNC4wMzgzIDIuMzMwMDhaTTE0LjAzODMgNC4xODM0N0MxMy44MTgzIDQuMTgzNDcgMTMuNjM5MiA0LjAwNDM5IDEzLjYzOTIgMy43ODQzOUMxMy42MzkyIDMuNTY0MjUgMTMuODE4MyAzLjM4NTMxIDE0LjAzODMgMy4zODUzMUMxNC4yNTg0IDMuMzg1MzEgMTQuNDM3NSAzLjU2NDI1IDE0LjQzNzUgMy43ODQzOUMxNC40Mzc1IDQuMDA0MzkgMTQuMjU4NCA0LjE4MzQ3IDE0LjAzODMgNC4xODM0N1oiIGZpbGw9IiNGN0NBMzgiLz4KPC9zdmc+Cg==" />
                  </button>
                  <button type="nav-link" class="btn-top-icon mx-2">
                    <i
                      class="fab fa-twitter"
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <footer-policy />

        </div>
      </footer>
      <!-- Footer -->
    </div>
  </div>
</template>

<script>
import FooterPolicy from '@/components/common/FooterPolicy.vue';
export default {
  components: { FooterPolicy },
  name: "footer-profile",
  data() {
    return {
      isGameDetail: false
    }
  },
  created() {
    this.getRouteName()
  },
  methods:{
    goToProfile(path) {
      this.$router.push(path);
    },
    goToPage(path) {
      if(path === this.$route.path){ return}
      this.$router.push(path)
      let top = document.getElementById("nav-bar-top");
      window.scrollTo(0, top.offsetTop);  
    },
    getRouteName()
    {
      if('/product' === this.$route.path) {
        this.isGameDetail = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";
div#footer-profile {
    padding-bottom: 7.5rem;
}

.text-link-footer {
  color: $dark-1 !important;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.015em;
}
.link-footer {
  display: flex;
  justify-content: space-between;
}

span.text-join {
  margin-right: 1rem;
}

a#link-a{
  color: #ffffff !important;
}
.text-link-footer a#link-b,
.text-link-footer a#link-c {
    color: #5f5f5f;
}

.col-md-4.link-footer-custom {
  display: contents;

  @media (max-width: 992px) {
    display: block;
    margin-top: 0.5rem;
  }
}

.row.icon-join-us {
    @media (max-width: 992px) {
      margin-top: 1rem;
    }
    @media (min-width: 800px) {
      min-width: 404px;
    }
}

.footer-profile__logo {
  max-width: 192px;
  // min-height: 33px;
}

.text-right-footer{
  // text-align : right;
  display: flex; 
  justify-content: flex-end;

    @media (max-width: 1140px) {
    justify-content: center;
  }
}
</style>