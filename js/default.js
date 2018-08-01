$(function () {

    // Used JSDoc to fix unresolved variable warning
    /**
     * @param data
     * @param data.firstNamePI
     * @param data.lastNamePI
     * @param data.middleNamePI
     * @param data.gender
     * @param data.birthplacePI
     * @param data.countryOfBirthPI
     * @param data.citizenshipPI
     * @param data.civilStatusPI
     * @param data.religionPI
     * @param data.educationalLevelPA
     * @param data.schoolYearPA
     * @param data.schoolPeriodPA
     * @param data.educationalLevel
     * @param data.EducationalLevelID
     * @param data.EducationalLevel
     * @param data.citizenship
     * @param data.CitizenshipID
     * @param data.Citizenship
     * @param data.religion
     * @param data.ReligionID
     * @param data.Religion
     * @param data.relationship
     * @param data.RelationshipID
     * @param data.Relationship
     * @param data.country
     * @param data.CountryID
     * @param data.Country
     * @param data.addressType
     * @param data.AddressTypeID
     * @param data.AddressType
     * @param data.contactType
     * @param data.ContactTypeID
     * @param data.ContactType
     * @param data.civilStatus
     * @param data.CivilStatusID
     * @param data.CivilStatus
     * @param data.schoolPeriod
     * @param data.SchoolPeriodTypeID
     * @param data.SchoolPeriodType
     */

    // Declaration & Initialization
    var baseURL = location.origin.toLowerCase();
    var isProcessing = false;

    // POST: New Applicant
    var newApplicant = {
        init: function () {
            this.submitForm();
        },
        submitForm: function () {
            // Prevent multiple ajax request
            if (isProcessing) return;
            isProcessing = true;

            $('form').on('submit', function (e) {

                var el = $(this);
                var btn = el.find('#btn-change-state');
                var data = $(this).serialize();

                $.ajax({
                    url: baseURL + '/home/new_applicant/',
                    type: 'POST',
                    dataType: 'json',
                    data: data,
                    cache: false,
                    processData: false,
                    beforeSend: function () {
                        el.find('#ajax-preloader').html(
                            '<div class="loader">' +
                            '  <svg class="circular" viewBox="25 25 50 50">' +
                            '    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>' +
                            '  </svg>' +
                            '</div>').show();
                        btn.attr('disabled', 'disabled');
                    },
                    complete: function () {
                        el.find('#ajax-preloader').html(
                            '<div class="loader">' +
                            '  <svg class="circular" viewBox="25 25 50 50">' +
                            '    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>' +
                            '  </svg>' +
                            '</div>').hide('fast');
                        btn.removeAttr('disabled');
                    },
                    success: function (data) {
                        if (data.status === true) {
                            // Show Notif
                            var notif = $('#notif');
                            notif.find('.notif').html(data.msg);
                            notif.modal('show');
                            // Auto hide notif
                            setTimeout(function () {
                                window.location.replace(baseURL);
                            }, 7200);
                        } else {
                            // Form Error
                            (Boolean(data.firstNamePI)) ? el.find('#firstNamePI_1').addClass('is-invalid') : el.find('#firstNamePI_1').removeClass('is-invalid');
                            (Boolean(data.middleNamePI)) ? el.find('#middleNamePI_1').addClass('is-invalid') : el.find('#middleNamePI_1').removeClass('is-invalid');
                            (Boolean(data.lastNamePI)) ? el.find('#lastNamePI_1').addClass('is-invalid') : el.find('#lastNamePI_1').removeClass('is-invalid');
                            (Boolean(data.gender)) ? el.find('#malePI').addClass('is-invalid') : el.find('#malePI').removeClass('is-invalid');
                            (Boolean(data.gender)) ? el.find('#femalePI').addClass('is-invalid') : el.find('#femalePI').removeClass('is-invalid');
                            (Boolean(data.mm)) ? el.find('#mm').addClass('is-invalid') : el.find('#mm').removeClass('is-invalid');
                            (Boolean(data.dd)) ? el.find('#dd').addClass('is-invalid') : el.find('#dd').removeClass('is-invalid');
                            (Boolean(data.yyyy)) ? el.find('#yyyy').addClass('is-invalid') : el.find('#yyyy').removeClass('is-invalid');
                            (Boolean(data.birthplacePI)) ? el.find('#birthplacePI_1').addClass('is-invalid') : el.find('#birthplacePI_1').removeClass('is-invalid');
                            (Boolean(data.countryOfBirthPI)) ? el.find('#countryOfBirthPI_1').addClass('is-invalid') : el.find('#countryOfBirthPI_1').removeClass('is-invalid');
                            (Boolean(data.citizenshipPI)) ? el.find('#citizenshipPI_1').addClass('is-invalid') : el.find('#citizenshipPI_1').removeClass('is-invalid');
                            (Boolean(data.civilStatusPI)) ? el.find('#civilStatusPI_1').addClass('is-invalid') : el.find('#civilStatusPI_1').removeClass('is-invalid');
                            (Boolean(data.religionPI)) ? el.find('#religionPI_1').addClass('is-invalid') : el.find('#religionPI_1').removeClass('is-invalid');
                            (Boolean(data.educationalLevelPA)) ? el.find('#educationalLevelPA_1').addClass('is-invalid') : el.find('#educationalLevelPA_1').removeClass('is-invalid');
                            (Boolean(data.schoolYearPA)) ? el.find('#schoolYearPA_1').addClass('is-invalid') : el.find('#schoolYearPA_1').removeClass('is-invalid');
                            (Boolean(data.schoolPeriodPA)) ? el.find('#schoolPeriodPA_1').addClass('is-invalid') : el.find('#schoolPeriodPA_1').removeClass('is-invalid');
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log('The following error occurred: ' + textStatus, errorThrown);
                    }
                });
                e.preventDefault();
            });
        }
    };

    // Other Methods
    var otherMethods = {
        init: function () {
            this.dynamicTextFieldAB();
            this.dynamicTextFieldFB();
            this.dynamicTextFieldAI();
            this.dynamicTextFieldCI();
            this.displayGRGV();
            this.dateMasking();
            this.disableContextMenu();
            this.buttonToggle();
            this.schoolYear();
        },
        
        dynamicTextFieldAB: function () {

            var MaxInputs = 3;
            var InputsWrapper = $('#InputsWrapperAB');
            var AddNewButton = $('#AddNewBtnAB');

            var x = InputsWrapper.length;
            var FieldCount = 1;

            AddNewButton.click(function (e) {
                if (x <= MaxInputs) {

                    FieldCount++;

                    InputsWrapper.append(
                        '<div class="col-lg-3 col-md-3 col-sm-12">' +
                        '    <div class="form-group">' +
                        '        <label for="educationalLevelAB">Educational Level</label>' +
                        '        <select id="educationalLevelAB_' + FieldCount + '" class="custom-select" name="educationalLevelAB[' + FieldCount + ']">' +
                        '            <option value="">Select</option>' +
                        '        </select>' +
                        '    </div>' +
                        '</div>' +
                        '<div class="col-lg-3 col-md-3 col-sm-12">' +
                        '    <div class="form-group">' +
                        '        <label for="schoolAB">School</label>' +
                        '        <input type="text" id="schoolAB" class="form-control" name="schoolAB[' + FieldCount + ']" tabindex="">' +
                        '    </div>' +
                        '</div>' +
                        '<div class="col-lg-3 col-md-3 col-sm-12">' +
                        '    <div class="form-group">' +
                        '        <label for="programAB">Program</label>' +
                        '        <input type="text" id="programAB" class="form-control" name="programAB[' + FieldCount + ']" tabindex="">' +
                        '    </div>' +
                        '</div>' +
                        '<div class="col-lg-3 col-md-3 col-sm-12">' +
                        '    <div class="form-group">' +
                        '        <label for="yearAttendedAB">Year Attended</label>' +
                        '        <input type="text" id="yearAttendedAB" class="form-control year-masking" name="yearAttendedAB[' + FieldCount + ']" placeholder="Year" maxlength="4" tabindex="">' +
                        '    </div>' +
                        '</div>'
                    );

                    x++;

                    var displayGRGV = function () {
                        var el = $('section');
                        var data = el.serialize();

                        var jqxhr = $.ajax({
                            url: baseURL + '/home/grgv_ds',
                            type: 'GET',
                            dataType: 'json',
                            data: data,
                            cache: true,
                            processData: false
                        });

                        jqxhr.done(function (data) {
                            if (data) {
                                $.each(data.educationalLevel, function (key, value) {
                                    el.find('#educationalLevelAB_' + FieldCount).append('<option value="' + value.EducationalLevelID + '">' + value.EducationalLevel + '</option>');
                                });
                            }
                        });

                        jqxhr.fail(function (jqXHR, textStatus, errorThrown) {
                            console.log('The following error occurred: ' + textStatus, errorThrown);
                        });
                    };

                    displayGRGV();
                    otherMethods.dateMasking();

                    AddNewButton.show();

                    if (x === 3) {
                        AddNewButton.hide();
                    }
                }
                e.preventDefault();
            });
        },
        // Family Background
        dynamicTextFieldFB: function () {

            var MaxInputs = 3;
            var InputsWrapper = $('#InputsWrapperFB');
            var AddNewButton = $('#AddNewBtnFB');

            var x = InputsWrapper.length;
            var FieldCount = 1;

            AddNewButton.click(function (e) {
                if (x <= MaxInputs) {

                    FieldCount++;

                    InputsWrapper.append(
                        '<div class="col-lg-4 col-md-4 col-sm-12">' +
                        '    <div class="form-group">' +
                        '        <label for="firstNameFB">First Name<span class="important">&oast;</span></label>' +
                        '        <input type="text" id="firstNameFB" class="form-control" name="firstNameFB[' + FieldCount + ']" tabindex="">' +
                        '    </div>' +
                        '</div>' +
                        '<div class="col-lg-4 col-md-4 col-sm-12">' +
                        '    <div class="form-group">' +
                        '        <label for="middleNameFB">Middle Name</label>' +
                        '        <input type="text" id="middleNameFB" class="form-control" name="middleNameFB[' + FieldCount + ']" tabindex="">' +
                        '    </div>' +
                        '</div>' +
                        '<div class="col-lg-4 col-md-4 col-sm-12">' +
                        '    <div class="form-group">' +
                        '        <label for="lastNameFB">Last Name<span class="important">&oast;</span></label>' +
                        '        <input type="text" id="lastNameFB" class="form-control" name="lastNameFB[' + FieldCount + ']" tabindex="">' +
                        '    </div>' +
                        '</div>' +
                        '<div class="col-lg-4 col-md-4 col-sm-12">' +
                        '    <div class="form-group">' +
                        '        <label for="relationshipFB">Relationship<span class="important">&oast;</span></label>' +
                        '        <select id="relationshipFB_' + FieldCount + '" class="custom-select" name="relationshipFB[' + FieldCount + ']">' +
                        '            <option value="">Select</option>' +
                        '        </select>' +
                        '    </div>' +
                        '</div>' +
                        '<div class="col-lg-4 col-md-4 col-sm-12">' +
                        '    <div class="form-group">' +
                        '        <label for="residentialAddressFB">Residential Address<span class="important">&oast;</span></label>' +
                        '        <input type="text" id="residentialAddressFB" class="form-control" name="residentialAddressFB[' + FieldCount + ']" tabindex="">' +
                        '    </div>' +
                        '</div>' +
                        '<div class="col-lg-4 col-md-4 col-sm-12">' +
                        '    <div class="form-group">' +
                        '        <label for="citizenshipFB">Citizenship<span class="important">&oast;</span></label>' +
                        '        <select id="citizenshipFB_' + FieldCount + '" class="custom-select" name="citizenshipFB[' + FieldCount + ']">' +
                        '            <option value="">Select</option>' +
                        '        </select>' +
                        '    </div>' +
                        '</div>' +
                        '<div class="col-lg-4 col-md-4 col-sm-12">' +
                        '    <div class="form-group">' +
                        '        <label for="religionFB">Religion<span class="important">&oast;</span></label>' +
                        '        <select id="religionFB_' + FieldCount + '" class="custom-select" name="religionFB[' + FieldCount + ']">' +
                        '            <option value="">Select</option>' +
                        '        </select>' +
                        '    </div>' +
                        '</div>' +
                        '<div class="col-lg-4 col-md-4 col-sm-12">' +
                        '    <div class="form-group">' +
                        '        <label for="emailAddressFB">Email Address<span class="important">&oast;</span></label>' +
                        '        <input type="text" id="emailAddressFB" class="form-control" name="emailAddressFB[' + FieldCount + ']" tabindex="">' +
                        '    </div>' +
                        '</div>' +
                        '<div class="col-lg-4 col-md-4 col-sm-12">' +
                        '    <div class="form-group">' +
                        '        <label for="relationshipToStudentFB">Relationship to Student<span class="optional">(For Guardian Only)</span></label>' +
                        '        <input type="text" id="relationshipToStudentFB" class="form-control" name="relationshipToStudentFB[' + FieldCount + ']" tabindex="">' +
                        '    </div>' +
                        '</div>'
                    );

                    x++;

                    var displayGRGV = function () {
                        var el = $('section');
                        var data = el.serialize();

                        var jqxhr = $.ajax({
                            url: baseURL + '/home/grgv_ds',
                            type: 'GET',
                            dataType: 'json',
                            data: data,
                            cache: true,
                            processData: false
                        });

                        jqxhr.done(function (data) {
                            if (data) {
                                $.each(data.citizenship, function (key, value) {
                                    el.find('#citizenshipFB_' + FieldCount).append('<option value="' + value.CitizenshipID + '">' + value.Citizenship + '</option>');
                                });
                                $.each(data.religion, function (key, value) {
                                    el.find('#religionFB_' + FieldCount).append('<option value="' + value.ReligionID + '">' + value.Religion + '</option>');
                                });
                                $.each(data.relationship, function (key, value) {
                                    el.find('#relationshipFB_' + FieldCount).append('<option value="' + value.RelationshipID + '">' + value.Relationship + '</option>');
                                });
                            }
                        });

                        jqxhr.fail(function (jqXHR, textStatus, errorThrown) {
                            console.log('The following error occurred: ' + textStatus, errorThrown);
                        });
                    };

                    displayGRGV();
                    otherMethods.dateMasking();

                    AddNewButton.show();

                    if (x === 3) {
                        AddNewButton.hide();
                    }
                }
                e.preventDefault();
            });
        },
        // Address Information
        dynamicTextFieldAI: function () {

            var MaxInputs = 3;
            var InputsWrapper = $('#InputsWrapperAI');
            var AddNewButton = $('#AddNewBtnAI');

            var x = InputsWrapper.length;
            var FieldCount = 1;

            AddNewButton.click(function (e) {
                if (x <= MaxInputs) {

                    FieldCount++;

                    InputsWrapper.append(
                        '<div class="col-lg-6 col-md-6 col-sm-12">' +
                        '    <div class="form-group">' +
                        '        <label for="addressTypeAI">Address Type</label>' +
                        '        <select id="addressTypeAI_' + FieldCount + '" class="custom-select" name="addressTypeAI[' + FieldCount + ']">' +
                        '            <option value="">Select</option>' +
                        '        </select>' +
                        '    </div>' +
                        '</div>' +
                        '<div class="col-lg-6 col-md-6 col-sm-12">' +
                        '    <div class="form-group">' +
                        '        <label for="countryAI">Country</label>' +
                        '        <select id="countryAI_' + FieldCount + '" class="custom-select" name="countryAI[' + FieldCount + ']">' +
                        '            <option value="">Select</option>' +
                        '        </select>' +
                        '    </div>' +
                        '</div>' +
                        '<div class="col-lg-12 col-md-12 col-sm-12">' +
                        '    <div class="form-group">' +
                        '        <label for="streetAddressAI">Street / Address</label>' +
                        '        <textarea id="streetAddressAI" class="form-control" name="streetAddressAI[' + FieldCount + ']" rows="3"></textarea>' +
                        '    </div>' +
                        '</div>'
                    );

                    x++;

                    var displayGRGV = function () {
                        var el = $('section');
                        var data = el.serialize();

                        var jqxhr = $.ajax({
                            url: baseURL + '/home/grgv_ds',
                            type: 'GET',
                            dataType: 'json',
                            data: data,
                            cache: true,
                            processData: false
                        });

                        jqxhr.done(function (data) {
                            if (data) {
                                $.each(data.country, function (key, value) {
                                    el.find('#countryAI_' + FieldCount).append('<option value="' + value.CountryID + '">' + value.Country + '</option>');
                                });
                                $.each(data.addressType, function (key, value) {
                                    el.find('#addressTypeAI_' + FieldCount).append('<option value="' + value.AddressTypeID + '">' + value.AddressType + '</option>');
                                });
                            }
                        });

                        jqxhr.fail(function (jqXHR, textStatus, errorThrown) {
                            console.log('The following error occurred: ' + textStatus, errorThrown);
                        });
                    };

                    displayGRGV();
                    otherMethods.dateMasking();

                    AddNewButton.show();

                    if (x === 3) {
                        AddNewButton.hide();
                    }
                }
                e.preventDefault();
            });
        },
        // Contact Information
        dynamicTextFieldCI: function () {

            var MaxInputs = 3;
            var InputsWrapper = $('#InputsWrapperCI');
            var AddNewButton = $('#AddNewBtnCI');

            var x = InputsWrapper.length;
            var FieldCount = 1;

            AddNewButton.click(function (e) {
                if (x <= MaxInputs) {

                    FieldCount++;

                    InputsWrapper.append(
                        '<div class="col-lg-6 col-md-6 col-sm-12">' +
                        '     <div class="form-group">' +
                        '         <label for="contactTypeCI">Contact Type</label>' +
                        '         <select id="contactTypeCI_' + FieldCount + '" class="custom-select" name="contactTypeCI[' + FieldCount + ']">' +
                        '             <option value="">Select</option>' +
                        '         </select>' +
                        '     </div>' +
                        '</div>' +
                        '<div class="col-lg-6 col-md-6 col-sm-12">' +
                        '     <div class="form-group">' +
                        '         <label for="contactDetailCI">Contact Detail</label>' +
                        '         <input type="text" id="contactDetailCI" class="form-control" name="contactDetailCI[' + FieldCount + ']" tabindex="">' +
                        '     </div>' +
                        '</div>'
                    );

                    x++;

                    var displayGRGV = function () {
                        var el = $('section');
                        var data = el.serialize();

                        var jqxhr = $.ajax({
                            url: baseURL + '/home/grgv_ds',
                            type: 'GET',
                            dataType: 'json',
                            data: data,
                            cache: true,
                            processData: false
                        });

                        jqxhr.done(function (data) {
                            if (data) {
                                $.each(data.contactType, function (key, value) {
                                    el.find('#contactTypeCI_' + FieldCount).append('<option value="' + value.ContactTypeID + '">' + value.ContactType + '</option>');
                                });
                            }
                        });

                        jqxhr.fail(function (jqXHR, textStatus, errorThrown) {
                            console.log('The following error occurred: ' + textStatus, errorThrown);
                        });
                    };

                    displayGRGV();
                    otherMethods.dateMasking();

                    AddNewButton.show();

                    if (x === 3) {
                        AddNewButton.hide();
                    }
                }
                e.preventDefault();
            });
        },
        // GRGV Dropdown List
        displayGRGV: function () {
            var el = $('section');
            var data = el.serialize();

            var jqxhr = $.ajax({
                url: baseURL + '/home/grgv_ds',
                type: 'GET',
                dataType: 'json',
                data: data,
                cache: true,
                processData: false
            });

            jqxhr.done(function (data) {
                if (data) {
                    $.each(data.citizenship, function (key, value) {
                        el.find('#citizenshipPI_1').append('<option value="' + value.CitizenshipID + '">' + value.Citizenship + '</option>');
                        el.find('#citizenshipFB_1').append('<option value="' + value.CitizenshipID + '">' + value.Citizenship + '</option>');
                    });
                    $.each(data.religion, function (key, value) {
                        el.find('#religionPI_1').append('<option value="' + value.ReligionID + '">' + value.Religion + '</option>');
                        el.find('#religionFB_1').append('<option value="' + value.ReligionID + '">' + value.Religion + '</option>');
                    });
                    $.each(data.civilStatus, function (key, value) {
                        el.find('#civilStatusPI_1').append('<option value="' + value.CivilStatusID + '">' + value.CivilStatus + '</option>');
                    });
                    $.each(data.country, function (key, value) {
                        el.find('#countryOfBirthPI_1').append('<option value="' + value.CountryID + '">' + value.Country + '</option>');
                        el.find('#countryAI_1').append('<option value="' + value.CountryID + '">' + value.Country + '</option>');
                    });
                    $.each(data.educationalLevel, function (key, value) {
                        el.find('#educationalLevelPA_1').append('<option value="' + value.EducationalLevelID + '">' + value.EducationalLevel + '</option>');
                        el.find('#educationalLevelAB_1').append('<option value="' + value.EducationalLevelID + '">' + value.EducationalLevel + '</option>');
                    });
                    $.each(data.schoolPeriod, function (key, value) {
                        el.find('#schoolPeriodPA_1').append('<option value="' + value.SchoolPeriodTypeID + '">' + value.SchoolPeriodType + '</option>');
                    });
                    $.each(data.relationship, function (key, value) {
                        el.find('#relationshipFB_1').append('<option value="' + value.RelationshipID + '">' + value.Relationship + '</option>');
                    });
                    $.each(data.addressType, function (key, value) {
                        el.find('#addressTypeAI_1').append('<option value="' + value.AddressTypeID + '">' + value.AddressType + '</option>');
                    });
                    $.each(data.contactType, function (key, value) {
                        el.find('#contactTypeCI_1').append('<option value="' + value.ContactTypeID + '">' + value.ContactType + '</option>');
                    });
                }
            });

            jqxhr.fail(function (jqXHR, textStatus, errorThrown) {
                console.log('The following error occurred: ' + textStatus, errorThrown);
            });
        },
        // Other Methods
        dateMasking: function () {
            $('.day-masking').mask("99", {placeholder: "dd"});
            $('.year-masking').mask("9999", {placeholder: "yyyy"});
        },
        disableContextMenu: function () {
            var el = $('body');
            // Disable context menu (right click menu)
            el.bind('contextmenu', function (e) {
                e.preventDefault();
            });
            // Disable highlighting
            el.bind("selectstart", function (e) {
                e.preventDefault();
            });
        },
        buttonToggle: function () {
            var btn = $('#btn-change-state');
            $('#confirmation').find('input:checkbox').on('click', function () {
                ($(this).is(':checked')) ? btn.attr('disabled', false) : btn.attr('disabled', true);
            });
        },
        schoolYear: function () {
            for (var i = 0; i < 1; i++) {
                var previousYear = (moment().year() - 1);
                var currentYear = moment().year();
                $('#schoolYearPA').append('<option value="' + (previousYear + i) + '">' + (previousYear + i) + '&mdash;' + (currentYear + i) + '</option>');
            }
        }
    };

    // Call Methods
    newApplicant.init();
    otherMethods.init();
});