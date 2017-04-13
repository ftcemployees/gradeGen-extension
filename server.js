var path = window.location.href;
var split = path.split('?ou=');
var courseId = split[1];


$.ajax({
  method: 'GET',
  url: `/d2l/api/le/1.19/${courseId}/grades/setup/`,
  headers: { 'X-Csrf-Token': localStorage['XSRF.Token'] },
  success: function(data) { console.log(data) }
})

$.ajax({
  method: 'PUT',
  url: `/d2l/api/le/1.19/${courseId}/grades/setup/`,
  headers: { 'X-Csrf-Token': localStorage['XSRF.Token'] },
  data: JSON.stringify(setupData),
  dataType: 'json',
  success: function(data) { console.log(data) },
  failure: function(err) { console.log(err) }
})

var setupData = {
  DefaultGradeSchemeId : 0,
  GradingSystem: "Weighted",
  IsNullGradeZero: false
}



$.ajax({
  method: 'GET',
  url: `/d2l/api/le/1.19/${courseId}/grades/categories/`,
  headers: { 'X-Csrf-Token': localStorage['XSRF.Token'] },
  success: function(data) { console.log(data) }
})

$.ajax({
  method: 'POST',
  url: `/d2l/api/le/1.19/${courseId}/grades/categories/`,
  headers: { 'X-Csrf-Token': localStorage['XSRF.Token'] },
  data: JSON.stringify(categoryData),
  dataType: 'json',
  success: function(data) { console.log(data) },
  failure: function(err) { console.log(err) }
})

var categoryData = {
  Name: 'Category1',
  ShortName: 'C1',
  Weight: 30,
  WeightDistributionType: 1,
  NumberOfLowestToDrop: 2,
  NumberOfHighestToDrop: 0,
  CanExceedMax: false,
  ExcludeFromFinalGrade: false,
  StartDate: null,
  EndDate: null,
  MaxPoints: 10,
  AutoPoints: null
}

// => returns categoryId, which we then need for all the grade items.


// Category 1 ID = 978112 :: weights evenly
// Category 2 ID = 978114 :: distribute weight by points
// Category 3 ID = 978123 :: weights evenly

// POSTing to new make new category, pretty sure only one at a time.
// this returns category JSON, so can use ID easily


$.ajax({
  method: 'POST',
  url: `/d2l/api/le/1.19/${courseId}/grades/`,
  headers: { 'X-Csrf-Token': localStorage['XSRF.Token'] },
  data: JSON.stringify(gradeItemData),
  dataType: 'json',
  success: function(data) { console.log(data) },
  failure: function(err) { console.log(err) }
})

var gradeItemData = {
  Name: "Item",
  ShortName: "Itm",
  GradeType: "Numeric",
  CategoryId: 978114,
  MaxPoints: 50,
  CanExceedMaxPoints: false,
  IsBonus: false,
  ExcludeFromFinalGradeCalculation: false,
  GradeSchemeId: 381,
  Description: { Content: "", Type: "Text" },
  AssociatedTool: null
}



for (let i = 1; i < 21; i++) {
  let gradeItemData = {
    Name: `Week ${i}`,
    ShortName: `W${i}`,
    GradeType: "Numeric",
    CategoryId: 978112,
    MaxPoints: 20,
    CanExceedMaxPoints: false,
    IsBonus: false,
    ExcludeFromFinalGradeCalculation: false,
    GradeSchemeId: 381,
    Description: { Content: "", Type: "Text" },
    AssociatedTool: null
  };

  $.ajax({
    method: 'POST',
    url: `/d2l/api/le/1.19/${courseId}/grades/`,
    headers: { 'X-Csrf-Token': localStorage['XSRF.Token'] },
    data: JSON.stringify(gradeItemData),
    dataType: 'json',
    success: function(data) { console.log(data) },
    failure: function(err) { console.log(err) }
  });
}
