var url, hour = new Date().getHours();

if (hour > 7 && hour < 18) {
  $(".daytime").addClass("day");
 } else {
	$(".daytime").addClass("night")
}