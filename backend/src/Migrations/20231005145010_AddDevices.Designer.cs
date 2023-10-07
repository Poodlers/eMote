﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Models;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20231005145010_AddDevices")]
    partial class AddDevices
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.8");

            modelBuilder.Entity("backend.Models.Access", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("DataFim")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("DataInicio")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int?>("UserAccesses")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("UserAccesses");

                    b.ToTable("Access");
                });

            modelBuilder.Entity("backend.Models.Devices", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PushAuth")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PushEndpoint")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PushP256DH")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Devices");
                });

            modelBuilder.Entity("backend.Models.EmotionDiaryEntry", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateOnly?>("Date")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<TimeOnly?>("Hour")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("ReflexaoEmotion")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Sentimentos")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int?>("UserEmotionDiaries")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("UserEmotionDiaries");

                    b.ToTable("EmotionDiaryEntry");
                });

            modelBuilder.Entity("backend.Models.Exercicio", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("EmotionDiaryEntryId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ExercicioFile")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("ExercicioName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int?>("ExerciseFav")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ModuloNumberOrder")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PageNumber")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("SubModuleExercicios")
                        .HasColumnType("INTEGER");

                    b.Property<int>("SubModuleNumberOrder")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("EmotionDiaryEntryId");

                    b.HasIndex("ExerciseFav");

                    b.HasIndex("SubModuleExercicios");

                    b.ToTable("Exercicio");
                });

            modelBuilder.Entity("backend.Models.MealDiaryEntry", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("CompensatoryBehaviors")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("ContentsOfMeal")
                        .HasColumnType("TEXT");

                    b.Property<DateOnly?>("Date")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("FeelingsAroundMeal")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool?>("HadAnEpisode")
                        .HasColumnType("INTEGER");

                    b.Property<bool?>("HadCompensatoryBehaviour")
                        .HasColumnType("INTEGER");

                    b.Property<TimeOnly?>("Hour")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool?>("PlainAttention")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Reflexao")
                        .HasColumnType("TEXT");

                    b.Property<bool?>("RestrainedConsumption")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("SkippedMeal")
                        .HasColumnType("INTEGER");

                    b.Property<TimeOnly?>("TimeOfMeal")
                        .HasColumnType("TEXT");

                    b.Property<int>("TipoRefeicao")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("UserFoodDiaries")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("UserFoodDiaries");

                    b.ToTable("MealDiaryEntry");
                });

            modelBuilder.Entity("backend.Models.ModuloContent", b =>
                {
                    b.Property<int>("ModuleNumberOrder")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("IntroText")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("ModuleNumberOrder");

                    b.ToTable("ModuloContent");
                });

            modelBuilder.Entity("backend.Models.ModuloUserProgress", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("DataFim")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("DataInicio")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsCompleted")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ModuloContentModuleNumberOrder")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Recompensa")
                        .HasColumnType("TEXT");

                    b.Property<int?>("Satisfacao")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("UserModulos")
                        .HasColumnType("INTEGER");

                    b.Property<float>("UserProgress")
                        .HasColumnType("REAL");

                    b.Property<int?>("Utilidade")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("ModuloContentModuleNumberOrder");

                    b.HasIndex("UserModulos");

                    b.ToTable("ModuloUserProgress");
                });

            modelBuilder.Entity("backend.Models.SubModule", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("SubModuleContent")
                        .HasColumnType("INTEGER");

                    b.Property<int>("SubModuleNumberOrder")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("SubModuleContent");

                    b.ToTable("SubModule");
                });

            modelBuilder.Entity("backend.Models.SubModulePage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ImageFile")
                        .HasColumnType("TEXT");

                    b.Property<string>("OtherFile")
                        .HasColumnType("TEXT");

                    b.Property<int>("PageNumber")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("SubModuleId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Text")
                        .HasColumnType("TEXT");

                    b.Property<string>("VideoFile")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("SubModuleId");

                    b.ToTable("SubModulePage");
                });

            modelBuilder.Entity("backend.Models.SubModuleUserProgress", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("DataFim")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("DataInicio")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsCompleted")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("ModuloUserProgressId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("SubModuleId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("ModuloUserProgressId");

                    b.HasIndex("SubModuleId");

                    b.ToTable("SubModuleUserProgress");
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("CreatedAt")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool>("HasAccessToApp")
                        .HasColumnType("INTEGER");

                    b.Property<int>("NotifsPerDay")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Role")
                        .HasColumnType("INTEGER");

                    b.Property<string>("TimeLeftInApp")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("backend.Models.Access", b =>
                {
                    b.HasOne("backend.Models.User", null)
                        .WithMany("Accesses")
                        .HasForeignKey("UserAccesses");
                });

            modelBuilder.Entity("backend.Models.EmotionDiaryEntry", b =>
                {
                    b.HasOne("backend.Models.User", null)
                        .WithMany("EmotionDiaryEntries")
                        .HasForeignKey("UserEmotionDiaries");
                });

            modelBuilder.Entity("backend.Models.Exercicio", b =>
                {
                    b.HasOne("backend.Models.EmotionDiaryEntry", null)
                        .WithMany("Exercicios")
                        .HasForeignKey("EmotionDiaryEntryId");

                    b.HasOne("backend.Models.User", null)
                        .WithMany("FavoriteExercises")
                        .HasForeignKey("ExerciseFav");

                    b.HasOne("backend.Models.SubModulePage", null)
                        .WithMany("Exercicios")
                        .HasForeignKey("SubModuleExercicios");
                });

            modelBuilder.Entity("backend.Models.MealDiaryEntry", b =>
                {
                    b.HasOne("backend.Models.User", null)
                        .WithMany("FoodDiaryEntries")
                        .HasForeignKey("UserFoodDiaries");
                });

            modelBuilder.Entity("backend.Models.ModuloUserProgress", b =>
                {
                    b.HasOne("backend.Models.ModuloContent", "ModuloContent")
                        .WithMany()
                        .HasForeignKey("ModuloContentModuleNumberOrder")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.User", null)
                        .WithMany("ModulosProgress")
                        .HasForeignKey("UserModulos");

                    b.Navigation("ModuloContent");
                });

            modelBuilder.Entity("backend.Models.SubModule", b =>
                {
                    b.HasOne("backend.Models.ModuloContent", null)
                        .WithMany("SubModules")
                        .HasForeignKey("SubModuleContent");
                });

            modelBuilder.Entity("backend.Models.SubModulePage", b =>
                {
                    b.HasOne("backend.Models.SubModule", null)
                        .WithMany("SubModulePages")
                        .HasForeignKey("SubModuleId");
                });

            modelBuilder.Entity("backend.Models.SubModuleUserProgress", b =>
                {
                    b.HasOne("backend.Models.ModuloUserProgress", null)
                        .WithMany("SubModuleUserProgresses")
                        .HasForeignKey("ModuloUserProgressId");

                    b.HasOne("backend.Models.SubModule", "SubModule")
                        .WithMany()
                        .HasForeignKey("SubModuleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("SubModule");
                });

            modelBuilder.Entity("backend.Models.EmotionDiaryEntry", b =>
                {
                    b.Navigation("Exercicios");
                });

            modelBuilder.Entity("backend.Models.ModuloContent", b =>
                {
                    b.Navigation("SubModules");
                });

            modelBuilder.Entity("backend.Models.ModuloUserProgress", b =>
                {
                    b.Navigation("SubModuleUserProgresses");
                });

            modelBuilder.Entity("backend.Models.SubModule", b =>
                {
                    b.Navigation("SubModulePages");
                });

            modelBuilder.Entity("backend.Models.SubModulePage", b =>
                {
                    b.Navigation("Exercicios");
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.Navigation("Accesses");

                    b.Navigation("EmotionDiaryEntries");

                    b.Navigation("FavoriteExercises");

                    b.Navigation("FoodDiaryEntries");

                    b.Navigation("ModulosProgress");
                });
#pragma warning restore 612, 618
        }
    }
}
