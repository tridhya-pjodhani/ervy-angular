import { ContactUsService } from "./../../services/contact-us.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-contact",
    templateUrl: "./contact.component.html",
    styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit {
    get f() {
        return this.createContactUsForm.controls;
    }

    public submitted: boolean = false;
    public createContactUsForm: FormGroup;
    uploadFileData: any;
    fileType: string[] = ["image/png", "image/jpeg"];

    constructor(
        private _formBuilder: FormBuilder,
        private _toasterService: ToastrService,
        private _contactUsService: ContactUsService
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.createContactUsForm = this._formBuilder.group({
            username: ["", [Validators.required]],
            query: ["", [Validators.required]],
            email: ["", [Validators.required, Validators.email]],
            contactUsImage: ["", [Validators.required]],
        });
    }

    onImagChangeFromFile(event: any): void {
        if (event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            this.uploadFileData = file;
            if (this.fileType.indexOf(file.type) >= 0) {
                const reader = new FileReader();
                reader.readAsDataURL(event.target.files[0]);
                reader.onload = (e: any) => {
                    this.createContactUsForm.patchValue({
                        contactUsImage: file,
                    });
                };
            } else {
                this.uploadFileData = undefined;
                this.createContactUsForm.controls.contactUsImage.reset();
                const message = file.type + " file type not support";
                this._toasterService.error("", message, {
                    toastClass: "toast ngx-toastr",
                    closeButton: true,
                });
            }
        }
    }

    submitData(): void {
        this.submitted = true;
        if (this.createContactUsForm.invalid) return;

        const formData = new FormData();
        for (let key in this.createContactUsForm.value) {
            formData.append(key, this.createContactUsForm.value[key]);
        }

        this._contactUsService.addContactList(formData).subscribe(
            (data: any) => {
                if (data.status) {
                }
            },
            (error: any) => {
                console.log("error", error);
            }
        );
    }
}
