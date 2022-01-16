import {IsNumber, IsString} from "class-validator";

export class CreatePostDto {
    @IsString({message: "Должно быть строкой"})
    readonly title: string;

    @IsString({message: "Должно быть строкой"})
    readonly content: string;

    // @IsNumber({}, {message: "Должно быть числом"})
    readonly userId: number;
}