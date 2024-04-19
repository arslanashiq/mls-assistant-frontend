"use client";
import Image from "next/image";
const TeamRealtorContent = () => {
  return (
	  <div className="donation-lander">
			<script async src="https://js.stripe.com/v3/buy-button.js"></script>
			<h1 className="mb-5">
				Buying or renting? Simply donate $50 or more to us or your favorite rider and take the bike at closing.* 
			</h1>
			<img src="./images/bike-ad-badge.jpg" className="img-fluid" alt="" />
			<h5 className="mt-5 mb-5">
				Supporting Americas favorite bike-a-thon just got more re/warding. List* your home with PMC Team Realtors and we&apos;ll cover your 2024 entry fee, Or take this cool special edition bike!
			</h5>
			<p>
				100% of every rider-raised dollar goes to <b>Dana-Farber Cancer Institute</b> Founded in 1980, the PMC is an annual bike-a-thon that raises more money for charity than any other single event in the country.
		  </p>
		  <div className="text-center">
			<stripe-buy-button buy-button-id="buy_btn_1P6exP4RzjdNYvPq0UgPYmTC" publishable-key="pk_live_4UFUvXCy040gK23uKAPXB3L3"></stripe-buy-button>
		  </div>
		  
		  


			<p className="mt-5">
				Dear Friends, Neighbors, Fellow Realtors;
				<br /><br />
				<img src="./images/mark-bike.png" className="mark-bike-img"  alt="" />
				I write today with enthusiasm as we approach 2024 Pan Mass Challenge- the huge bike-a-thon from Sturbridge and Wellesley to Provincetown supporting the Jimmy Fund.
				<br /><br />

				Like too many families, ours has suffered from the curse of cancer.  
				<br /><br />


				To keep us on course, the Fund requires money- a lot of money. It needs your money.
				<br /><br />
				Riders and volunteers can ride to the ends of earth and back, but that gallant effort itself simply won’t heal without your support.
				<br /><br />

				So here’s my proposal to help out. A challenge I am pitching to my entire trade group of one million Realtors to join; Start Moving for Good.
				<br /><br />
				It’s a simple coupon, sure, but a powerful idea. List your home with any participating Realtor and we&apos;ll cover your 2019 entry fees, PLUS you&apos;ll get a really cool  virtual tour with its own special PMC badge!
				<br /><br />
				Each year the PMC brings us closer by the mile. Last year over $60 million dollars was rasied for the Jimmy Fund.
				<br /><br />

				Your generous referral is hugely appreciated. We promise to move on it for good.
				<br /><br />
				Mark Holt
				<br /><br />
				REALTOR Team Captain
			  
			</p>
			<div className="row align-items-center mt-5">
				<div className="col-md-6">
					<h6>
						Donate
					</h6>
					<h1>Your Support Is Critical</h1>
					<p>
						Search for a rider, team, or volunteer, read their story, make a donation to support their goal. Over 280,000 supporters contribute to the PMC’s gift annually making up 62% of the Jimmy Fund’s annual revenue. 100% of every rider-raised dollar goes directly to Dana-Farber Cancer Institute.
					</p>
					<stripe-buy-button buy-button-id="buy_btn_1P6exP4RzjdNYvPq0UgPYmTC" publishable-key="pk_live_4UFUvXCy040gK23uKAPXB3L3"></stripe-buy-button>
				</div>  
				<div className="col-md-6 mt-5 mt-md-0">
					<img src="./images/pmc-donate-665x700.webp" className="img-fluid" alt="" />
				</div>  
			</div>
			<div className="row align-items-center mt-5">
				<div className="col-md-6 order-2 order-md-1 mt-5 mt-md-0">
					<img src="./images/mark-bike.png" className="img-fluid" alt="" />
				</div>
				<div className="col-md-6 order-1 order-md-2">
				<h1>The Ride</h1>
				<p>
					On August 3 & 4, 2024, the PMC community will come together from all corners of the world with one mission: raise funds for cancer research and treatment at Dana-Farber Cancer Institute. Together, we will get closer by the mile to a world without cancer. This is what a bike is meant to do.
				  </p>
				<stripe-buy-button buy-button-id="buy_btn_1P6exP4RzjdNYvPq0UgPYmTC" publishable-key="pk_live_4UFUvXCy040gK23uKAPXB3L3"></stripe-buy-button>
				  
				</div>
			</div>
		</div>
  );

};

export default TeamRealtorContent;
