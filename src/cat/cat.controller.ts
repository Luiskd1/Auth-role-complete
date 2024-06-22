import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { ActiveUser } from 'src/common/decorator/active-user.decorator';
import { UserActiveInterface } from 'src/common/interface/user-active.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/role.enum';

@Auth(Role.USER)
@Controller('cat')
export class CatController {
  constructor(private readonly catsService: CatService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto, @ActiveUser() user: UserActiveInterface) {
    return this.catsService.create(createCatDto, user);
  }

  @Get()
  findAll(@ActiveUser() user: UserActiveInterface) {
    return this.catsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @ActiveUser() user: UserActiveInterface) {
    return this.catsService.findOne(id, user);
  }

  @Patch(':id')
  update(@Param('id' , ParseIntPipe) id: number, @Body() updateCatDto: UpdateCatDto, @ActiveUser() user: UserActiveInterface) {
    return this.catsService.update(id, updateCatDto, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @ActiveUser() user: UserActiveInterface) {
    return this.catsService.remove(id, user);
  }
}
